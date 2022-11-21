package com.stefan.gameservice.models.game;

import com.stefan.gameserviceapi.GameState;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Table("games")
public record GameEntity(@Id Long id, GameState gameState, Long host, LocalDateTime createDate) {
    @Builder
    public GameEntity {}

    public static GameEntity newGame(Long hostPlayerId) {
        return new GameEntity(null, GameState.INITIAL, hostPlayerId, LocalDateTime.now());
    }

    public GameEntity startGame() {
        return new GameEntity(id, GameState.IN_PROGRESS, host, createDate);
    }

    public GameEntity endGame() {
        return new GameEntity(id, GameState.FINISHED, host, createDate);
    }
}
