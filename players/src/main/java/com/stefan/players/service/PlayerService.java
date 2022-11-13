package com.stefan.players.service;

import com.stefan.players.model.player.PlayerDto;
import com.stefan.players.model.player.PlayerEntity;
import com.stefan.players.model.player.PlayerMapper;
import com.stefan.players.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;

    public Flux<PlayerDto> findAll() {
        return playerRepository.findAll()
                .map(this::toDto);
    }

    public Flux<PlayerDto> findByUserId(Long userId) {
        return playerRepository.findAllByUserId(userId)
                .map(this::toDto);
    }

    public Mono<PlayerDto> findByPlayerId(Long playerId) {
        return playerRepository.findById(playerId)
                .map(this::toDto);
    }

    public Mono<PlayerDto> findByNickname(String nickname) {
        return playerRepository.findByNickname(nickname)
                .map(this::toDto);
    }

    private PlayerDto toDto(PlayerEntity entity) {
        return PlayerMapper.INSTANCE.toDto(entity);
    }
}
