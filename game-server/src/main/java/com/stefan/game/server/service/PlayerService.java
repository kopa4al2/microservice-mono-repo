package com.stefan.game.server.service;

import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public interface PlayerService {

    /**
     * Start a session for the user's player. Return a session token
     * to authenticate for the web socket.
     * @param userId the user id.
     * @param playerId the player id.
     * @return the session token.
     */
    Mono<String> startSession(Long userId, Long playerId);

    Mono<Void> stopSession(Long playerId);
}
