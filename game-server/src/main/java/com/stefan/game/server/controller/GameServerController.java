package com.stefan.game.server.controller;

import com.stefan.game.server.model.api.GameDtoImpl;
import com.stefan.game.server.service.GameServerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
@RestController
@RequiredArgsConstructor
public class GameServerController {

    private final GameServerService gameServerService;

    @PostMapping("/create")
    public ResponseEntity<Void> startGame(@RequestBody GameDtoImpl game) {
        gameServerService.startGame(game);
        return ResponseEntity.accepted().body(null);
    }

    @GetMapping("/connect")
    public ResponseEntity<Void> connect(@RequestParam Long gameId, @RequestParam Long playerId) {
        gameServerService.connect(gameId, playerId);
        return ResponseEntity.ok(null);
    }
}
