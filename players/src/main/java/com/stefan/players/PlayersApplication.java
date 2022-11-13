package com.stefan.players;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
public class PlayersApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlayersApplication.class, args);
    }

}
