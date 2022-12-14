package com.stefan.game.server.repository;

import com.stefan.game.server.model.player.PlayerEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
public interface PlayerRepository extends ReactiveCrudRepository<PlayerEntity, Long> {
    Mono<PlayerEntity> findByNickname(String nickname);

    Flux<PlayerEntity> findAllByUserId(Long userId);
}
