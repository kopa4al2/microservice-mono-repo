import { Object3D } from "three";
import Tile from "../../../map/tiles/Tile";
import RenderEngine from "../../../RenderEngine";
import { AssetNames } from "../../AssetManager";
import Entity from "../Entity";
import { EntityNames } from "../EntityManager";
import MovableEntity from "./MovableEntity";


export default class Boat extends MovableEntity {

    constructor(renderEngine: RenderEngine) {
        super(EntityNames.BOAT, AssetNames.BOAT, renderEngine, { isSelectable: true });
    }

    init(model: Object3D, newInstance?: boolean): Entity | undefined {
        if (newInstance) {
            const instance = new Boat(this.renderEngine);
            instance.model = model;

            return instance
        }
    }


    isPlaceable(tile: Tile):boolean {
        return !!tile.properties.isWater && tile.entities.length === 0;
    }
}