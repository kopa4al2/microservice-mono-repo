package com.stefan.gameservice.service;

import com.google.common.cache.CacheLoader;
import com.stefan.gameservice.exception.GameServiceException;
import com.stefan.gameservice.models.api.GameImpl;
import com.stefan.gameservice.models.api.GameMapper;
import com.stefan.gameservice.models.api.PlayerAction;
import com.stefan.gameservice.models.api.PlayerMapper;
import com.stefan.gameservice.models.game.GameEntity;
import com.stefan.gameservice.models.player.PlayerEntity;
import com.stefan.gameservice.repository.GameRepository;
import com.stefan.gameservice.repository.PlayerRepository;
import com.stefan.gameserviceapi.Game;
import com.stefan.gameserviceapi.GameState;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;


/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Service
@Transactional
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private static final String BASE_LOBBY_URL = "games/lobby";

    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;

    private final SimpMessagingTemplate messagingTemplate;
//    private final LoadingCache<Long, Mono<GameEntity>> gameCache;
//    private final LoadingCache<Long, Mono<PlayerEntity>> playerCache;

    private final WebClient.Builder webClient;

    /*public GameServiceImpl(PlayerRepository playerRepository, GameRepository gameRepository, WebClient.Builder webClient) {
        this.playerRepository = playerRepository;
        this.gameRepository = gameRepository;
        this.webClient = webClient;
        gameCache = CacheBuilder.newBuilder()
                .concurrencyLevel(3)
                .expireAfterWrite(20, TimeUnit.MINUTES)
                .build(loadGameFromDatabase());
        playerCache = CacheBuilder.newBuilder()
                .concurrencyLevel(3)
                .expireAfterWrite(20, TimeUnit.MINUTES)
                .build(loadPlayerFromDatabase());
    }
*/

    @Override
    public Mono<Game> createGame(Long hostPlayerId) {
        return findPlayerThatIsInGame(hostPlayerId, null)
                .flatMap(player -> gameRepository
                        .save(GameEntity.newGame(player.id()))
                        .flatMap(game -> playerRepository.save(player.joinGame(game.id()))
                                .flatMap(p -> this.toGameDto(game))))
                .doOnSuccess(game -> notifyMembers(game.getId(), hostPlayerId, PlayerAction.CREATE_GAME));
    }

    @Override
    public Flux<Game> allGames() {
        return gameRepository.findAll()
                .flatMap(this::toGameDto);
    }

    @Override
    public Flux<Game> allGamesByState(GameState gameState) {
        return gameRepository.findAllByGameStateIn(gameState)
                .flatMap(this::toGameDto);
    }

    @Override
    public Mono<Game> joinGame(Long gameId, Long playerId) {
        return findGameHavingState(gameId, GameState.INITIAL)
                .flatMap(game -> findPlayerThatIsInGame(playerId, null)
                        .flatMap(p -> playerRepository.save(p.joinGame(game.id())))
                        .flatMap(p -> toGameDto(game)))
                .doOnSuccess(game -> notifyMembers(game.getId(), playerId, PlayerAction.JOIN_GAME));
    }

    @Override
    public Mono<Game> leaveGame(Long gameId, Long playerId) {
        return findGameHavingState(gameId, GameState.INITIAL)
                .flatMap(game -> findPlayerThatIsInGame(playerId, gameId)
                        .flatMap(p -> playerRepository.save(p.leaveGame()))
                        .flatMap(p -> toGameDto(game)))
                .doOnSuccess(game -> notifyMembers(game.getId(), playerId, PlayerAction.LEAVE_GAME));
    }

    @Override
    public Mono<Game> startGame(Long gameId) {
        return createGameServer(findGameHavingState(gameId, GameState.READY_TO_START)
                .flatMap(game -> gameRepository.save(game.startGame()))
                .flatMap(this::toGameDto));
    }

    @Override
    public Mono<Game> endGame(Long gameId) {
        return findGameHavingState(gameId, GameState.IN_PROGRESS)
                .flatMap(game -> gameRepository.save(game.endGame()))
                .flatMap(this::toGameDto);
    }

    @Override
    public Mono<Game> readyPlayer(Long gameId, Long playerId) {
        final var playerMono = findPlayerThatIsInGame(playerId, gameId);
        final var gameMono = findGameHavingState(gameId, GameState.INITIAL);
        final var allPlayersInGame = playerRepository.findAllByCurrentGame(gameId)
                .collectList();

        return Mono.zip(playerMono, gameMono, allPlayersInGame)
                .flatMap(tuple3 -> {
                    final var playersInGame = tuple3.getT3();
                    final var allReady = playersInGame.stream()
                            .filter(p -> !Objects.equals(p.id(), playerId))
                            .allMatch(p -> p.readyState() == PlayerEntity.READY);

                    if (playersInGame.size() > 1 && allReady) {
                        notifyMembers(gameId, playerId, PlayerAction.ALL_READY);
                        return Mono.zip(gameRepository.save(tuple3.getT2().readyGame()),
                                playerRepository.save(tuple3.getT1().ready()));
                    }
                    return Mono.zip(Mono.just(tuple3.getT2()),
                            playerRepository.save(tuple3.getT1().ready()));
                })
                .flatMap(tuple2 -> toGameDto(tuple2.getT1()))
                .doOnSuccess(game -> notifyMembers(gameId, playerId, PlayerAction.PLAYER_READY));
    }

    @Override
    public Mono<Game> unReadyPlayer(Long gameId, Long playerId) {
        final var player = findPlayerThatIsInGame(playerId, gameId);
        final var game = findGameHavingState(gameId, GameState.INITIAL);
        return Mono.zip(player, game)
                .flatMap(tuple2 -> Mono.zip(
                        playerRepository.save(tuple2.getT1().unReady()),
                        Mono.just(tuple2.getT2())))
                .flatMap(tuple2 -> toGameDto(tuple2.getT2()))
                .doOnSuccess(ignored -> notifyMembers(gameId, playerId, PlayerAction.PLAYER_UN_READY));
    }

    private void notifyMembers(Long gameId, Long playerId, PlayerAction playerAction) {
        var sendUrl = Optional.ofNullable(gameId)
                .map(id -> BASE_LOBBY_URL + "/" + id)
                .orElse(BASE_LOBBY_URL);
        messagingTemplate.convertAndSend(sendUrl, Map.of("PLAYER_ID", playerId, "PLAYER_ACTION", playerAction));
    }

    private Mono<GameEntity> findGameHavingState(Long gameId, GameState expectedGameState) {
        return gameRepository.findById(gameId)
                .switchIfEmpty(Mono.error(new GameServiceException(
                        "There is no game with id: " + gameId,
                        HttpStatus.NOT_FOUND.value())))
                .flatMap(game -> game.gameState().equals(expectedGameState)
                        ? Mono.just(game)
                        : Mono.error(new GameServiceException(
                        "Game is not in correct state. Expected was: "
                                + expectedGameState + " actual: " + game.gameState(),
                        HttpStatus.BAD_REQUEST.value())));
    }

    private Mono<PlayerEntity> findPlayerThatIsInGame(Long playerId, Long expectedGameId) {
        return playerRepository.findById(playerId)
                .switchIfEmpty(Mono.error(new GameServiceException(
                        "There is no player with id: " + playerId,
                        HttpStatus.NOT_FOUND.value())))
                .flatMap(player -> Objects.equals(player.currentGame(), expectedGameId)
                        ? Mono.just(player)
                        : Mono.error(new GameServiceException(
                        "Player is not in the expected game. Expected: "
                                + expectedGameId + " Actual: " + player.currentGame(),
                        HttpStatus.BAD_REQUEST.value())));
    }

    private Mono<Game> toGameDto(GameEntity game) {
        return playerRepository.findAllByCurrentGame(game.id())
                .flatMap(player -> findUserId(player.id())
                        .map(u -> PlayerMapper.instance.toPlayerDto(player, u)))
                .collectList()
                .map(players -> GameMapper.instance.toGameDto(game, players));
    }

    private Mono<Long> findUserId(Long playerId) {
        return webClient.build()
                .get()
                .uri("http://users-service/user/players/" + playerId)
                .retrieve()
                .bodyToMono(Long.class);
    }

    private Mono<Game> createGameServer(Mono<Game> game) {
        return webClient.build()
                .post()
                .uri("http://game-server/create")
                .body(game, GameImpl.class)
                .retrieve().toBodilessEntity()
                .filter(response -> response.getStatusCode().equals(HttpStatus.CREATED))
                .flatMap(response -> game);
    }

    private CacheLoader<Long, Mono<GameEntity>> loadGameFromDatabase() {
        return new CacheLoader<>() {
            @Override
            public Mono<GameEntity> load(Long key) {
                return gameRepository.findById(key);
            }
        };
    }

    private CacheLoader<Long, Mono<PlayerEntity>> loadPlayerFromDatabase() {
        return new CacheLoader<>() {
            @Override
            public Mono<PlayerEntity> load(Long key) {
                return playerRepository.findById(key);
            }
        };
    }

}
