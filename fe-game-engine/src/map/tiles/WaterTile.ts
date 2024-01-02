import { Vector2, Vector3 } from "three";
import AssetManager, { AssetNames } from "../../models/AssetManager";
import RenderEngine from "../../RenderEngine";
import TileMap from "../TileMap";
import Tile from "./Tile";

const tileProperties = {
    isWater: true
}

export default class WaterTile extends Tile {

    constructor(gridXY: Vector2, sceneXYZ: Vector3, tileMap: TileMap, renderEngine: RenderEngine) {
        const object = AssetManager.getTile(AssetNames.WATER_HEX).clone();
        super('WATER', gridXY, sceneXYZ, tileProperties, object, tileMap, renderEngine);
    }
}