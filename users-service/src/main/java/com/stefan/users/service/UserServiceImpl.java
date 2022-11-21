package com.stefan.users.service;

import com.stefan.commons.StatusCodeException;
import com.stefan.gameserviceapi.Player;
import com.stefan.users.model.api.UserCreateDto;
import com.stefan.users.model.entity.UserEntity;
import com.stefan.users.repository.UserRepository;
import com.stefan.userservice.api.User;
import com.stefan.userservice.api.UserWithPlayers;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final WebClient.Builder webClient;

    @Override
    public Mono<UserWithPlayers> getUserWithPlayers(Long userId) {
        return findUser(userId)
                .flatMap(user -> toUser(user));
    }

    @Override
    public Flux<Long> getUsersPlayers(Long userId) {
        return null;
    }

    @Override
    public Mono<User> getUser(Long userId) {
        return null;
    }

    @Override
    public Mono<User> addPlayerToUser(Long userId, Long playerId) {
        return null;
    }

    @Override
    public Mono<User> createUser(UserCreateDto user) {
        return null;
    }

    private Mono<UserEntity> findUser(Long userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new StatusCodeException(
                        "No user with id: " + userId,
                        HttpStatus.NOT_FOUND.value())));
    }

    private Mono<UserWithPlayers> toUser(UserEntity user) {
        return Mono.just(null);
    }

    private List<Player> fetchPlayers() {
        return new ArrayList<>();
    }
}
