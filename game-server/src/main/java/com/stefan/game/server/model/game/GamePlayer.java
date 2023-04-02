package com.stefan.game.server.model.game;

import com.stefan.game.server.model.PlayerTurn;
import com.stefan.game.server.model.game.possessions.concrete.Unit;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
public class GamePlayer {

    private List<Unit> units;
    private int actionPoints;
    private List<PlayerTurn> issuedCommands;
}
