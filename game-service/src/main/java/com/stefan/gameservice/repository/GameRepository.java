package com.stefan.gameservice.repository;

import com.stefan.gameservice.models.game.GameEntity;
import com.stefan.gameserviceapi.GameState;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Repository
public interface GameRepository extends ReactiveCrudRepository<GameEntity, Long> {

    @Query("INSERT INTO game_service.players_games (game_id, player_id) VALUES (:gameId, :playerId) RETURNING game_id")
    Mono<Long> addToGame(Long gameId, Long playerId);

    @Query("DELETE FROM game_service.players_games WHERE game_id=:gameId AND player_id=:playerId")
    Mono<Void> removeFromGame(Long gameId, Long playerId);

    Flux<GameEntity> findAllByGameStateIn(GameState... gameStates);
}
