package com.stefan.players.controller;

import com.stefan.players.model.player.PlayerDto;
import com.stefan.players.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Controller
@ResponseBody
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/players")
    public Flux<PlayerDto> allPlayers() {
        return playerService.findAll();
    }

    @GetMapping("/players/forUser/{userId}")
    public Flux<PlayerDto> allByUserId(@PathVariable Long userId) {
        return playerService.findByUserId(userId);
    }

    @GetMapping("/players/byId/{playerId}")
    public Mono<PlayerDto> findById(@PathVariable Long playerId) {
        return playerService.findByPlayerId(playerId);
    }

    @GetMapping("/players/byNickname/{nickname}")
    public Mono<PlayerDto> findById(@PathVariable String nickname) {
        return playerService.findByNickname(nickname);
    }
}
