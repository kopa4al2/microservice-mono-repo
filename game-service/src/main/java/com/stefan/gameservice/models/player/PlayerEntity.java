package com.stefan.gameservice.models.player;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Table("players")
public record PlayerEntity(@Id Long id, String nickname, Long score, Long currentGame, int readyState) {
    public static int READY = 1;
    public static int NOT_READY = -1;
    public static int NOT_IN_GAME = 0;

    @Builder
    public PlayerEntity {}

    public PlayerEntity joinGame(Long currentGame) {
        return new PlayerEntity(id, nickname, score, currentGame, NOT_READY);
    }

    public PlayerEntity leaveGame() {
        return new PlayerEntity(id, nickname, score, null, NOT_IN_GAME);
    }

    public PlayerEntity ready() {
        return new PlayerEntity(id, nickname, score, currentGame, READY);
    }

    public PlayerEntity unReady() {
        return new PlayerEntity(id, nickname, score, currentGame, NOT_READY);
    }
}
