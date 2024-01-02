import Tile from "./Tile";
import { Mesh, MeshBasicMaterial, Object3D, Vector2, Vector3 } from "three";
import TileMap from "../TileMap";
import AssetManager, { AssetNames } from "../../models/AssetManager";
import RenderEngine from "../../RenderEngine";

export default class HoverTile extends Tile {


    constructor(map: TileMap) {
        const hoverMaterial = new MeshBasicMaterial({ color: 0xFF00F0 });
        hoverMaterial.transparent = true;
        hoverMaterial.opacity = 0.1;
        const hoverHex = AssetManager.getAsset(AssetNames.GRASS1).clone();

        hoverHex.traverse(m => {
            if (m instanceof Mesh) {
                m.material = hoverMaterial;
            }
        })

        // @ts-ignore
        super('HOVER_TILE', new Vector2(-1, -1), new Vector3(-999, -999, -999), true, hoverHex, map, null);
    }

    init(game: RenderEngine) {
        // game.overlayScene.add(this.model);
    }
}