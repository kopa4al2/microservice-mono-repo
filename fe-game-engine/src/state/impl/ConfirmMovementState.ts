import InputState from "../InputState";
import UserInputData from "../../input/UserInputData";
import InputManager from "../InputManager";
import Tile from "../../map/tiles/Tile";
import Entity from "../../models/entities/Entity";
import MovableEntity from "../../models/entities/movable/MovableEntity";
import ColorUtils from "../../utils/ColorUtils";
import { Color } from "three";
import { LogLevel } from "ts-loader/dist/logger";

export default class ConfirmMovementState implements InputState {
    onClick(inputManager: InputManager): void {
        const path = inputManager.sharedState.currentDrawnPath as Tile[];
        const tile = inputManager.calcHoveredTile();
        const selectedUnit = inputManager.sharedState.selectedUnit as MovableEntity;

        if (!tile || selectedUnit.isMoving) {
            return;
        }

        const lastTileOfPath = path[path.length - 1];
        if (tile != lastTileOfPath) {
            inputManager.clearDrawnPath();
            inputManager.setState(inputManager.UNIT_SELECTED_STATE);
            return;
        }

        if (path) {
            selectedUnit.moveTo(path, tile => {
                ColorUtils.paintMesh(tile.model, tile.originalColor);
                if (tile == path[path.length - 2]) {
                    inputManager.setState(inputManager.UNIT_SELECTED_STATE);
                }
            });
        }
    }

    onMouseMove(inputManager: InputManager): void {
    }

    onRightClick(inputManager: InputManager): void {
        const selectedUnit = inputManager.sharedState.selectedUnit as MovableEntity;

        if (selectedUnit.isMoving) {
            return
        }


        inputManager.clearDrawnPath();
        inputManager.setState(inputManager.NO_SELECTION_STATE);
        inputManager.deselect(selectedUnit);
    }
}