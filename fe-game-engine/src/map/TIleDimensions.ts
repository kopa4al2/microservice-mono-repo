import AssetManager, { AssetNames } from "../models/AssetManager";
import { Box3 } from "three";

export default class TileDimensions {

    static hexRadius: number = 0;
    static hexHeight: number = 0;

    private constructor() {
    }

    static initDimensions() {
        const baseHexModel = AssetManager.getAsset(AssetNames.BASE_HEX);
        const boundingBox = new Box3().setFromObject(baseHexModel);

        const halfWidth =  (boundingBox.max.x - boundingBox.min.x) / 2;
        const halfHeight =   (boundingBox.max.y - boundingBox.min.y) / 2;
        const hexRadius = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight);
        const hexWidth = 2 * hexRadius;

        TileDimensions.hexHeight = Math.sqrt(3) / 2 * hexWidth;
        TileDimensions.hexRadius = hexRadius;
    }


}