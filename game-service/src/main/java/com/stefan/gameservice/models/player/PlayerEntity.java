package com.stefan.gameservice.models.player;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Table("players")
public record PlayerEntity(@Id Long id, String nickname, Long score, Long currentGame) {
    @Builder
    public PlayerEntity {}

    public PlayerEntity joinGame(Long currentGame) {
        return new PlayerEntity(id, nickname, score, currentGame);
    }

    public PlayerEntity leaveGame() {
        return new PlayerEntity(id, nickname, score, null);
    }
}
