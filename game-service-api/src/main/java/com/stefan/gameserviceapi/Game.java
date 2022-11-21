package com.stefan.gameserviceapi;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 15.11.2022
 */
public interface Game {

    GameState getGameState();

    List<Player> getPlayers();
}
