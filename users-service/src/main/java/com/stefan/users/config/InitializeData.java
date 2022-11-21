package com.stefan.users.config;

import com.stefan.users.model.entity.UserEntity;
import com.stefan.users.repository.UserRepository;
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
    public ApplicationListener<ApplicationReadyEvent> applicationReadyListener(UserRepository userRepository) {
        return event -> userRepository.count()
                .subscribe(count -> {
                    if (count == 0) {
                        Flux.just("admin")
                                .map(username -> new UserEntity(null, username, username, "password", null))
                                .flatMap(userRepository::save)
                                .subscribe(user -> Flux
                                        .zip(
                                                userRepository.addPlayerToUser(user.id(), 1L),
                                                userRepository.addPlayerToUser(user.id(), 2L))
                                        .subscribe()
                                );
                    }
                });
    }
}
