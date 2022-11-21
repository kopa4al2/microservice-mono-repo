package com.stefan.gameservice.repository;

import com.stefan.gameservice.models.player.PlayerEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Repository
public interface PlayerRepository extends ReactiveCrudRepository<PlayerEntity, Long> {

    Flux<PlayerEntity> findAllByCurrentGame(Long gameId);
}
