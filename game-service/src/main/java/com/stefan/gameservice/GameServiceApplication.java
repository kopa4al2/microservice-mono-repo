package com.stefan.gameservice;

import com.stefan.gameservice.models.game.GameEntity;
import com.stefan.gameservice.models.player.PlayerEntity;
import com.stefan.gameservice.repository.GameRepository;
import com.stefan.gameservice.repository.PlayerRepository;
import com.stefan.gameserviceapi.GameState;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import reactor.core.publisher.Flux;

@SpringBootApplication
public class GameServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GameServiceApplication.class, args);
    }

    @Bean
    ApplicationListener<ApplicationReadyEvent> onReady(GameRepository gameRepository, PlayerRepository playerRepository) {
        return event -> Flux.merge(gameRepository.count(), playerRepository.count())
                .reduce(Long::sum)
                .subscribe(count -> {
                    if (count == 0) {
                        Flux.just("stefan", "ivan", "sasho")
                                .map(nick -> PlayerEntity.builder()
                                        .nickname(nick)
                                        .build())
                                .flatMap(playerRepository::save)
                                .subscribe();
                    }
                });
    }

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("SpringShop API")
                        .description("Spring application")
                        .version("v0.0.1")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                        .description("SpringShop Wiki Documentation")
                        .url("https://springshop.wiki.github.org/docs"));
    }
}
