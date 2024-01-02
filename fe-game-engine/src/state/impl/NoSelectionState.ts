import { Raycaster } from "three";
import { EntityNames } from "../../models/entities/EntityManager";
import MovableEntity from "../../models/entities/movable/MovableEntity";
import ColorUtils from "../../utils/ColorUtils";
import InputManager from "../InputManager";
import InputState from "../InputState";

export default class NoSelectionState implements InputState {
    raycaster: Raycaster;

    constructor() {
        this.raycaster = new Raycaster();
    }

    onClick(inputManager: InputManager): void {
        if (inputManager.sharedState.currentDomElement) {
            inputManager.sharedState.placeableUnit = inputManager.createEntity(EntityNames.DRAGON);
            inputManager.sharedState.placeableUnit.model?.position.set(-99, -99, -99);
            inputManager.setState(inputManager.PLACE_STATE);
            return;
        }

        const hoveredEntity = inputManager.calcHoveredEntity();
        const entityOnHoveredTile = inputManager.sharedState.hoveredTile?.entities[0]
        const selectedEntity = hoveredEntity || entityOnHoveredTile;

        if (!selectedEntity) {
            return;
        }

        const currentHovered = inputManager.sharedState.hoveredTile;
        ColorUtils.paintMesh(currentHovered?.model, currentHovered?.originalColor);
        inputManager.sharedState.selectedUnit = selectedEntity;
        inputManager.outlineEntity(selectedEntity, ColorUtils.SELECT_ENTITY_COLOR);

        inputManager.select(selectedEntity)
        inputManager.setState(inputManager.UNIT_SELECTED_STATE);
    }

    onMouseMove(inputManager: InputManager): void {
        const tile = inputManager.calcHoveredTile();
        if (!tile || tile == inputManager.sharedState.hoveredTile) {
            return;
        }

        inputManager.removeOutline();
        inputManager.replaceHoveredTile(tile);
        ColorUtils.hoverMesh(tile.model);

        const hoveredEntity = inputManager.calcHoveredEntity();
        const entityOnHoveredTile = inputManager.sharedState.hoveredTile?.entities[0];
        const entity = hoveredEntity || entityOnHoveredTile;
        if (entity) {
            inputManager.outlineEntity(entity, ColorUtils.HOVER_ENTITY_COLOR);
            inputManager.sharedState.hoveredUnit = entityOnHoveredTile;
        }
    }

    onRightClick(inputManager: InputManager): void {

    }
}