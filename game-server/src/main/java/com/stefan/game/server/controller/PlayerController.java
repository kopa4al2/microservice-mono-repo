package com.stefan.game.server.controller;

import com.stefan.game.server.model.player.PlayerDto;
import com.stefan.game.server.service.PlayerServiceImpl;
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

    private final PlayerServiceImpl playerService;

    @GetMapping("user/{userId}/player/{playerId}/startSession")
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
