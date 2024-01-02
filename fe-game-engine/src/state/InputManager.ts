import { mul } from "three/examples/jsm/nodes/math/OperatorNode";
import PlaceState from "./impl/PlaceState";
import InputState from "./InputState";
import UserInputData from "../input/UserInputData";
import SharedState from "./SharedState";
import NoSelectionState from "./impl/NoSelectionState";
import UnitSelectedState from "./impl/UnitSelectedState";
import { Box3, ConeGeometry, Mesh, MeshBasicMaterial, Object3D, Raycaster, Vector2, Vector3 } from "three";
import RenderEngine from "../RenderEngine";
import Entity from "../models/entities/Entity";
import TileMap from "../map/TileMap";
import EntityManager, { EntityNames } from "../models/entities/EntityManager";
import Tile from "../map/tiles/Tile";
import ColorUtils from "../utils/ColorUtils";
import ConfirmMovementState from "./impl/ConfirmMovementState";
import { Easing, Tween } from "@tweenjs/tween.js";

export default class InputManager {

    readonly NO_SELECTION_STATE = new NoSelectionState();
    readonly UNIT_SELECTED_STATE = new UnitSelectedState();
    readonly CONFIRM_MOVEMENT_STATE = new ConfirmMovementState();
    readonly PLACE_STATE = new PlaceState();

    readonly sharedState: SharedState;

    private activeState: InputState;
    private raycaster: Raycaster;
    private renderEngine: RenderEngine;
    private gameMap: TileMap;
    private entityManager: EntityManager;

    private selectedCone: Object3D;
    private selectedConeTween: Tween<any>;

    constructor(renderEngine: RenderEngine, gameMap: TileMap, entityManager: EntityManager) {
        this.raycaster = new Raycaster();
        this.activeState = this.NO_SELECTION_STATE;
        this.renderEngine = renderEngine;
        this.gameMap = gameMap;
        this.entityManager = entityManager;
        this.sharedState = {
            mousePosition: new Vector2(),
        }
        this.createCone();
    }

    setState(nextState: InputState) {
        this.activeState = nextState;
    }

    handleClick(userInput: UserInputData) {
        this.sharedState.currentDomElement = userInput.hoveredHtmlElement;
        this.sharedState.mousePosition.copy(userInput.mousePosition);
        this.activeState.onClick(this);
    }

    handleMouseMove(userInput: UserInputData) {
        this.sharedState.mousePosition.copy(userInput.mousePosition);
        this.activeState.onMouseMove(this);
    }

    handleRightClick(userInput: UserInputData) {
        this.sharedState.mousePosition.copy(userInput.mousePosition);
        this.activeState.onRightClick(this);
    }

    createEntity(name: EntityNames) {
        const entity = this.entityManager.createEntity(name);
        this.renderEngine.add(entity.model);
        return entity;
    }

    removeEntity(entity: Entity) {
        this.entityManager.removeEntity(entity);
    }

    clearDrawnPath(): void {
        this.sharedState
            .currentDrawnPath?.forEach(tile => ColorUtils.paintMesh(tile.model, tile.originalColor));

        delete this.sharedState.currentDrawnPath;
    }

    outlineEntity(entity: Entity, color: string) {
        this.renderEngine.outlinePass.visibleEdgeColor.set(color);
        this.renderEngine.outlinePass.selectedObjects = [entity.model as Object3D];
    }

    select(entity: Entity) {
        const model = entity.model as Object3D;
        this.selectedCone.scale.set(0.1, 0.1, 0.1);
        const boundingBox = new Box3().setFromObject(model);

        this.selectedCone.position.set(model.position.x, model.position.y + boundingBox.max.y, model.position.z);
        model.attach(this.selectedCone);

        const multiplier = this.selectedCone.position.y < 1 ? 0.7 : 1.5;
        this.selectedCone.position.y *= multiplier;
        this.initConeAnimation();
    }

    deselect(entity: Entity) {
        entity.model?.remove(this.selectedCone);
        this.selectedConeTween.stop();
    }

    removeOutline() {
        this.renderEngine.outlinePass.selectedObjects = [];
    }

    replaceHoveredTile(tile: Tile) {
        const currentHovered = this.sharedState.hoveredTile;
        ColorUtils.paintMesh(currentHovered?.model, currentHovered?.originalColor);
        this.sharedState.hoveredTile = tile;
    }

    calcHoveredEntity(): Entity | undefined {
        this.raycaster.setFromCamera(this.sharedState.mousePosition, this.renderEngine.camera);
        const intersects = this.raycaster.intersectObjects(this.entityManager.getPlacedEntities(), true);

        if (intersects.length === 0) {
            return;
        }

        const { entityId } = intersects[0].object.userData;

        if (!entityId) {
            console.warn("Found hovered object without user data: ", intersects)
            return;
        }

        return this.entityManager.getEntity(entityId);
    }

    calcHoveredTile(): Tile | undefined {
        this.raycaster.setFromCamera(this.sharedState.mousePosition, this.renderEngine.camera);
        const intersects = this.raycaster.intersectObjects(this.gameMap.tileModels, true);

        if (intersects.length == 0) {
            return;
        }
        const prevObject = intersects[0].object;

        if (!prevObject.userData.gridXY) {
            console.warn("Found hovered tile without gridXY: ", intersects)
            return;
        }

        const { userData: { gridXY } } = prevObject;

        return this.gameMap.getTile(gridXY.x, gridXY.y);
    }

    private createCone() {
        const geometry = new ConeGeometry(5, 20, 32);
        const material = new MeshBasicMaterial({ color: ColorUtils.SELECT_ENTITY_COLOR });
        const cone = new Mesh(geometry, material);
        cone.geometry.rotateX(-Math.PI);

        this.selectedCone = cone;
    }

    private initConeAnimation() {
        const pos = this.selectedCone.position.clone();
        const downTween = new Tween(this.selectedCone.position)
            .to({ y: pos.y + pos.y * 0.2 }, 300)
            .easing(Easing.Linear.None);
        const upTween = new Tween<any>(this.selectedCone.position)
            .to({ y: pos.y }, 300)
            .easing(Easing.Exponential.In);
        downTween.chain(upTween.chain(downTween));

        downTween.start();

        this.selectedConeTween = downTween;
    }
}