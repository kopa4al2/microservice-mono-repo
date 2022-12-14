package com.stefan.game.server.config;

import com.stefan.game.server.model.player.PlayerEntity;
import com.stefan.game.server.repository.PlayerRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Flux;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Configuration
public class InitializeData {

    @Bean
    public ApplicationListener<ApplicationReadyEvent> applicationReadyListener(PlayerRepository playerRepository) {
            return event -> playerRepository.count().subscribe(count -> {
                if (count == 0) {
                    Flux.just("p1", "p2")
                            .map(username -> new PlayerEntity(null, 1L, username, "empty_desc"))
                            .flatMap(playerRepository::save)
                            .subscribe();
                }
            });
    }
}
