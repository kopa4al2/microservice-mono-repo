package com.stefan.users.service;

import com.stefan.users.repository.UserRepository;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 21.11.2022
 */
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    @Override
    public Mono<String> generateToken(Long userId, Long playerId) {
        return null;
    }

    @Override
    public void validateToken(String token) {

    }
}
