import { Object3D } from "three";
import Tile from "../../../map/tiles/Tile";
import RenderEngine from "../../../RenderEngine";
import { AssetNames } from "../../AssetManager";
import Entity from "../Entity";
import { EntityNames } from "../EntityManager";
import MovableEntity from "./MovableEntity";


export default class ArcDeva extends MovableEntity {

    constructor(renderEngine: RenderEngine) {
        super(EntityNames.ARC_DEVA, AssetNames.ARC_DEVA, renderEngine, { isSelectable: true });
    }

    init(model: Object3D, newInstance?: boolean): Entity | undefined {
        if (newInstance) {
            const instance = new ArcDeva(this.renderEngine);
            instance.model = model;

            return instance
        }
    }


    isPlaceable(tile: Tile):boolean {
        return !!tile.properties.isGrass && tile.entities.length === 0;
    }
}