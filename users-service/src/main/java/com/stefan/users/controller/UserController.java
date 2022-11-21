package com.stefan.users.controller;

import com.stefan.users.model.entity.UserEntity;
import com.stefan.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@RestController
@ResponseBody
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/users")
    public Flux<UserEntity> getUserPlayers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{userId}/players/")
    public Flux<Long> getUserPlayers(@PathVariable Long userId) {
        return userRepository.findAllUserPlayers(userId);
    }

    @GetMapping("/user/players/{playerId}")
    public Mono<Long> getUserByPlayer(@PathVariable Long playerId) {
        return userRepository.findUserByPlayerId(playerId);
    }

    @PostMapping("/user/players/all")
    public Flux<Long> getUsersByPlayerIds(@RequestBody List<Long> playerIds) {
        return userRepository.findUsersByPlayerIds(playerIds);
    }

    @PostMapping("/user/{userId}/players/{playerId}/add")
    public Mono<Long> addPlayerToUser(@PathVariable Long userId, @PathVariable Long playerId) {
        return userRepository.addPlayerToUser(userId, playerId);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleError(Exception e) {
        log.error("Unexpected error occurred", e);
        return ResponseEntity
                .status(500)
                .body(e.getMessage());
    }
}
