import { Object3D } from "three";
import Tile from "../../../map/tiles/Tile";
import RenderEngine from "../../../RenderEngine";
import { AssetNames } from "../../AssetManager";
import Entity from "../Entity";
import { EntityNames } from "../EntityManager";
import MovableEntity from "./MovableEntity";


export default class Dragon extends MovableEntity {

    constructor(renderEngine: RenderEngine) {
        super(EntityNames.DRAGON, AssetNames.DRAGON, renderEngine, { isSelectable: true });
        this.relativePosition.set(0, 1.3, 0);
    }

    init(model: Object3D, newInstance?: boolean): Entity | undefined {
        model.scale.set(30, 30, 30);

        if (newInstance) {
            const instance = new Dragon(this.renderEngine);
            instance.model = model;

            return instance
        }
    }


    isPlaceable(tile: Tile):boolean {
        return !!tile.properties.isGrass && tile.entities.length === 0;
    }
}