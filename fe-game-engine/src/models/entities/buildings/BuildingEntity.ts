import Entity, { BaseEntity } from "../Entity";
import Tile from "../../../map/tiles/Tile";
import { Color, Mesh, Object3D, Vector3 } from "three";
import * as TWEEN from "@tweenjs/tween.js";
import RenderEngine from "../../../RenderEngine";
import EntityProperties from "../EntityProperties";
import { EntityNames } from "../EntityManager";
import { generateUUID } from "three/src/math/MathUtils";


// TODO: If we don't need it, delete it.
export default abstract class BuildingEntity extends BaseEntity {

}