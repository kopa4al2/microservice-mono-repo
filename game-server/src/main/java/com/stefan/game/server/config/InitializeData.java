package com.stefan.game.server.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Configuration
public class InitializeData {

    @Bean
    public ApplicationListener<ApplicationReadyEvent> applicationReadyListener() {
        return event -> {};
    }
}
