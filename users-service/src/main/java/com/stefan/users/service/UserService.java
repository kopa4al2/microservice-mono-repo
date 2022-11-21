package com.stefan.users.service;

import com.stefan.users.model.api.UserCreateDto;
import com.stefan.userservice.api.User;
import com.stefan.userservice.api.UserWithPlayers;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public interface UserService {

    Mono<UserWithPlayers> getUserWithPlayers(Long userId);

    Flux<Long> getUsersPlayers(Long userId);

    Mono<User> getUser(Long userId);

    Mono<User> addPlayerToUser(Long userId, Long playerId);

    Mono<User> createUser(UserCreateDto user);
}
