import { Object3D } from "three";
import Tile from "../../../map/tiles/Tile";
import RenderEngine from "../../../RenderEngine";
import AssetManager, { AssetNames } from "../../AssetManager";
import Entity from "../Entity";
import { EntityNames } from "../EntityManager";
import BuildingEntity from "./BuildingEntity";

export default class House1 extends BuildingEntity {

    constructor(renderEngine: RenderEngine) {
        super(EntityNames.HOUSE1, AssetNames.HOUSE1, renderEngine, { isSelectable: false });
        this.relativePosition.set(0, 0.3, 0);
    }

    init(model: Object3D, newInstance?: boolean): Entity | undefined {
        model.scale.set(0.1, 0.1, 0.1);

        if (newInstance) {
            const instance = new House1(this.renderEngine);
            instance.model = model;

            return instance;
        }
    }


    isPlaceable(tile: Tile):boolean {
        return !!tile.properties.isGrass && tile.entities.length === 0;
    }
}