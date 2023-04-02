package com.stefan.game.server.model;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
public class PlayerTurnResponse {

    private PlayerTurnResponse() {

    }

    public static PlayerTurnResponse accepted() {
        return new PlayerTurnResponse();
    }

    public static PlayerTurnResponse declined() {
        return new PlayerTurnResponse();
    }
}
