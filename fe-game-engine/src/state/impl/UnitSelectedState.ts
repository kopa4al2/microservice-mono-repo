import Entity from "../../models/entities/Entity";
import MovableEntity from "../../models/entities/movable/MovableEntity";
import ColorUtils from "../../utils/ColorUtils";
import InputManager from "../InputManager";
import InputState from "../InputState";

export default class UnitSelectedState implements InputState {
    onClick(inputManager: InputManager): void {
        const path = inputManager.sharedState.currentDrawnPath;

        if (path) {
            path.forEach(tile => ColorUtils.paintMesh(tile.model, ColorUtils.CONFIRM_PATH_COLOR));
            inputManager.setState(inputManager.CONFIRM_MOVEMENT_STATE);
        }
    }

    onMouseMove(inputManager: InputManager): void {
        const tile = inputManager.calcHoveredTile();
        const selectedUnit = inputManager.sharedState.selectedUnit as MovableEntity;

        if (tile == inputManager.sharedState.hoveredTile || selectedUnit.isMoving || !(selectedUnit instanceof MovableEntity)) {
            return;
        }

        if (!tile || !selectedUnit.canMove(tile)) {
            inputManager.clearDrawnPath();
            inputManager.sharedState.hoveredTile = tile;
            return;
        }

        inputManager.sharedState.hoveredTile = tile;

        const path = selectedUnit.findShortestPath(tile);

        inputManager.sharedState
            .currentDrawnPath?.forEach(tile => ColorUtils.paintMesh(tile.model, tile.originalColor));
        path.forEach(tile => ColorUtils.paintMesh(tile.model, ColorUtils.PATH_COLOR))

        inputManager.sharedState.currentDrawnPath = path;
    }

    onRightClick(inputManager: InputManager): void {
        inputManager.clearDrawnPath();
        inputManager.setState(inputManager.NO_SELECTION_STATE)
        inputManager.deselect(inputManager.sharedState.selectedUnit as Entity)
    }
}