package com.stefan.gameservice.service;

import com.stefan.gameservice.exception.GameServiceException;
import com.stefan.gameservice.models.api.GameMapper;
import com.stefan.gameservice.models.api.PlayerMapper;
import com.stefan.gameservice.models.game.GameEntity;
import com.stefan.gameservice.models.player.PlayerEntity;
import com.stefan.gameservice.repository.GameRepository;
import com.stefan.gameservice.repository.PlayerRepository;
import com.stefan.gameserviceapi.Game;
import com.stefan.gameserviceapi.GameState;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.stream.Collectors;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Transactional
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;

    private final WebClient.Builder webClient;

    @Override
    public Mono<Game> createGame(Long hostPlayerId) {
        return findPlayerThatIsInGame(hostPlayerId, null)
                .flatMap(player -> gameRepository
                        .save(GameEntity.newGame(player.id()))
                        .flatMap(game -> playerRepository.save(player.joinGame(game.id()))
                                .flatMap(p -> this.toGameDto(game))));
    }

    @Override
    public Flux<Game> allGames() {
        /*webClient.build()
                .get()
                .uri("http://players-service/players")
                .retrieve()
                .bodyToFlux(Map.class)
                .subscribe(resp -> {
                    System.out.println(resp);
                });*/
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
                        .flatMap(p -> toGameDto(game)));
    }

    @Override
    public Mono<Game> leaveGame(Long gameId, Long playerId) {
        return findGameHavingState(gameId, GameState.INITIAL)
                .flatMap(game -> findPlayerThatIsInGame(playerId, gameId)
                        .flatMap(p -> playerRepository.save(p.leaveGame()))
                        .flatMap(p -> toGameDto(game)));
    }

    @Override
    public Mono<Game> startGame(Long gameId) {
        return findGameHavingState(gameId, GameState.READY_TO_START)
                .flatMap(game -> gameRepository.save(game.startGame()))
                .flatMap(this::toGameDto);
    }

    @Override
    public Mono<Game> endGame(Long gameId) {
        return findGameHavingState(gameId, GameState.IN_PROGRESS)
                .flatMap(game -> gameRepository.save(game.endGame()))
                .flatMap(this::toGameDto);
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
                .collectList()
                .map(players -> GameMapper.instance.toGameDto(
                        game,
                        players.stream()
                                .map(PlayerMapper.instance::toPlayerDto)
                                .collect(Collectors.toList())));
    }

    private void findUser(Long playerId) {

    }

}
