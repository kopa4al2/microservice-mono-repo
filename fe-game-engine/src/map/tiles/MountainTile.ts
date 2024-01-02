import { Vector2, Vector3 } from "three";
import AssetManager from "../../models/AssetManager";
import RenderEngine from "../../RenderEngine";
import TileMap from "../TileMap";
import Tile from "./Tile";


const tileProperties = {
    isMountain: true,
}
export default class MountainTile extends Tile {

    constructor(gridXY: Vector2, sceneXYZ: Vector3, tileMap: TileMap, renderEngine: RenderEngine) {
        super('MOUNTAIN', gridXY, sceneXYZ, tileProperties, AssetManager.getMountainTile().clone(), tileMap, renderEngine);
    }
}