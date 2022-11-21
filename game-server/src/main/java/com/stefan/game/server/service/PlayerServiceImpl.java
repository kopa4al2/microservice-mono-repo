package com.stefan.game.server.service;

import com.stefan.game.server.model.player.PlayerDto;
import com.stefan.game.server.model.player.PlayerEntity;
import com.stefan.game.server.model.player.PlayerMapper;
import com.stefan.game.server.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;

    @Override
    public Mono<String> startSession(Long userId, Long playerId) {
        return null;
    }

    @Override
    public Mono<Void> stopSession(Long playerId) {
        return null;
    }
}
