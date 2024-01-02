import { Vector2, Vector3 } from "three";
import AssetManager from "../../models/AssetManager";
import RenderEngine from "../../RenderEngine";
import TileMap from "../TileMap";
import Tile from "./Tile";


const tileProperties = {
    isGrass: true
}
export default class GrassTile extends Tile {

    constructor(gridXY: Vector2, sceneXYZ: Vector3, tileMap: TileMap, renderEngine: RenderEngine) {
        const object = AssetManager.getGrassTile().clone();
        super('GRASS', gridXY, sceneXYZ, tileProperties, object, tileMap, renderEngine);
    }
}