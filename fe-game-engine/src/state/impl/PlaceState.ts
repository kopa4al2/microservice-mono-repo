import Tile from "../../map/tiles/Tile";
import InputState from "../InputState";
import UserInputData from "../../input/UserInputData";
import InputManager from "../InputManager";
import { Color, ConeGeometry, Mesh, MeshBasicMaterial, Raycaster } from "three";
import ColorUtils from "../../utils/ColorUtils";
import MovableEntity from "../../models/entities/movable/MovableEntity";

export default class PlaceState implements InputState {
    raycaster: Raycaster;

    constructor() {
        this.raycaster = new Raycaster();
    }

    onClick(inputManager: InputManager): void {
        const { placeableUnit } = inputManager.sharedState;
        const tile = inputManager.sharedState.hoveredTile;

        if (!tile || !placeableUnit || !placeableUnit.isPlaceable(tile)) {
            return;
        }

        placeableUnit.place(tile);
        inputManager.sharedState.placeableUnit = undefined;
        inputManager.setState(inputManager.NO_SELECTION_STATE);
    }

    onMouseMove(inputManager: InputManager): void {
        const { placeableUnit } = inputManager.sharedState;
        const tile = inputManager.calcHoveredTile();

        if (!tile || !placeableUnit || tile == inputManager.sharedState.hoveredTile) {
            return;
        }

        placeableUnit.model?.position.set(tile.position.x, tile.position.y + 1.3, tile.position.z);

        inputManager.replaceHoveredTile(tile)
        ColorUtils.paintMesh(tile.model, placeableUnit.isPlaceable(tile) ? ColorUtils.CONFIRM_PATH_COLOR : ColorUtils.ERROR_COLOR);

    }

    onRightClick(inputManager: InputManager): void {
        const { placeableUnit } = inputManager.sharedState;

        if (!placeableUnit) {
            return;
        }

        inputManager.removeEntity(placeableUnit);
        inputManager.sharedState.placeableUnit = undefined;
        inputManager.setState(inputManager.NO_SELECTION_STATE);
    }
}