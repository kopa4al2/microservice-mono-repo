package com.stefan.gameservice.controller;

import com.stefan.gameservice.exception.GameServiceException;
import com.stefan.gameservice.service.GameService;
import com.stefan.gameserviceapi.Game;
import com.stefan.gameserviceapi.GameState;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@RestController
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping("/create")
    public Mono<Game> createGame(@RequestParam Long playerId) {
        return gameService.createGame(playerId);
    }

    @GetMapping("/join")
    public Mono<Game> joinGame(@RequestParam Long gameId, @RequestParam Long playerId) {
        return gameService.joinGame(gameId, playerId);
    }

    @GetMapping("/leave")
    public Mono<Game> leaveGame(@RequestParam Long gameId, @RequestParam Long playerId) {
        return gameService.leaveGame(gameId, playerId);
    }

    @GetMapping("/ready")
    public Mono<Game> readyPlayer(@RequestParam Long gameId, @RequestParam Long playerId) {
        return gameService.readyPlayer(gameId, playerId);
    }

    @GetMapping("/unready")
    public Mono<Game> unReadyPlayer(@RequestParam Long gameId, @RequestParam Long playerId) {
        return gameService.unReadyPlayer(gameId, playerId);
    }

    @GetMapping("/all")
    public Flux<Game> allGames() {
        return gameService.allGames();
    }

    @GetMapping("/allByStatus")
    public Flux<Game> allGamesByStatus(@RequestParam(required = false) GameState status) {
        return gameService.allGamesByState(status);
    }

    @GetMapping("/start")
    public Mono<Game> startGame(@RequestParam Long gameId) {
        return gameService.startGame(gameId);
    }

    @ExceptionHandler(GameServiceException.class)
    public ResponseEntity<String> handleError(GameServiceException e) {
        return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
    }

    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<String> handleMicroserviceError(WebClientResponseException e) {
        return ResponseEntity.status(e.getStatusCode())
                .body(String.format("%s Response body: %s", e.getMessage(), e.getResponseBodyAsString()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleError(Exception e) {
        return ResponseEntity.status(500).body(e.getMessage());
    }
}
