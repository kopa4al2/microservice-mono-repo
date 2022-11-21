package com.stefan.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Configuration
@RequiredArgsConstructor
public class OnStartListener {

    private final Environment environment;

    @EventListener({ApplicationReadyEvent.class})
    public void begin() {
        System.out.printf("Message is %s", this.environment.getProperty("message"));
    }
}
