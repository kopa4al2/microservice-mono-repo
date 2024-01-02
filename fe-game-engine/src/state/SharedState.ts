import { Vector2 } from "three";
import Entity from "../models/entities/Entity";
import Tile from "../map/tiles/Tile";

export default interface SharedState {
    currentDomElement?: HTMLElement;
    mousePosition: Vector2;
    placeableUnit?: Entity;
    selectedUnit?: Entity;
    hoveredUnit?: Entity;
    hoveredTile?: Tile;
    currentDrawnPath?: Tile[];
}