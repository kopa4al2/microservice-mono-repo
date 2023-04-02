package com.stefan.gameservice.service;

import com.stefan.gameserviceapi.Game;
import com.stefan.gameserviceapi.GameState;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
public interface GameService {

    Mono<Game> createGame(Long playerId);

    Mono<Game> joinGame(Long gameId, Long playerId);

    Flux<Game> allGames();

    Flux<Game> allGamesByState(GameState gameState);

    Mono<Game> leaveGame(Long gameId, Long playerId);

    Mono<Game> startGame(Long gameId);

    Mono<Game> endGame(Long gameId);

    Mono<Game> readyPlayer(Long gameId, Long playerId);

    Mono<Game> unReadyPlayer(Long gameId, Long playerId);
}
