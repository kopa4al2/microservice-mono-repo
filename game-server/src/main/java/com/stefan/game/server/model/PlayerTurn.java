package com.stefan.game.server.model;

import com.stefan.game.server.model.game.GameInstance;

/**
 * Implementation of the visitor design pattern.
 *
 * @author Stefan Ivanov
 * @since 21.11.2022
 */
public interface PlayerTurn {

    /**
     * Accept the game object, each concrete implementation know how to modify
     * the game state.
     *
     * @param game the game.
     */
    void execute(GameInstance game);

    /**
     * Undo the turn.
     *
     * @param game the game.
     */
    void undo(GameInstance game);
}
