package com.stefan.users.repository;

import com.stefan.users.model.entity.UserEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
public interface UserRepository extends ReactiveCrudRepository<UserEntity, Long> {

    @Query("SELECT player_id FROM users_service.user_players WHERE user_id = :userId")
    Flux<Long> findAllUserPlayers(Long userId);

    @Query("SELECT user_id FROM users_service.user_players WHERE player_id = :playerId")
    Mono<Long> findUserByPlayerId(Long playerId);

    @Query("SELECT user_id FROM users_service.user_players WHERE player_id in (:playerId)")
    Flux<Long> findUsersByPlayerIds(List<Long> playerId);

    @Query("INSERT INTO users_service.user_players (user_id, player_id) VALUES (:userId, :playerId) RETURNING user_id")
    Mono<Long> addPlayerToUser(Long userId, Long playerId);
}
