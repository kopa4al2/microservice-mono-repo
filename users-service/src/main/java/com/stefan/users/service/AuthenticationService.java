package com.stefan.users.service;

import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public interface AuthenticationService {

    Mono<String> generateToken(Long userId, Long playerId);

    void validateToken(String token);
}
