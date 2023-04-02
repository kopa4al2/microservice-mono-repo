package com.stefan.game.server.model.turns;

import com.stefan.game.server.model.PlayerTurn;
import com.stefan.game.server.model.game.Coordinates;
import com.stefan.game.server.model.game.GameInstance;
import com.stefan.game.server.model.game.possessions.concrete.Unit;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
public class MoveUnitTurn implements PlayerTurn {

    private String unitId;
    private Coordinates sourceCoordinates;
    private Coordinates targetCoordinates;

    @Override
    public void execute(GameInstance game) {
        final var tileAtTargetCoordinates = game.getGameMap().getTileAtCoordinates(targetCoordinates);
        final var playerPossession = game.getPossessionAtCoordinates(sourceCoordinates, unitId, Unit.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "There was no such unit: " + unitId + " at coordinates: " + sourceCoordinates));

        // TODO: Proper validations

        // TODO: Take actions points
        game.movePossession(unitId, sourceCoordinates, targetCoordinates);
    }

    @Override
    public void undo(GameInstance game) {
        // TODO: Return action points
        game.movePossession(unitId, targetCoordinates, sourceCoordinates);
    }
}
