import { Mesh, Object3D, Vector3 } from "three";
import { generateUUID } from "three/src/math/MathUtils";
import Tile from "../../map/tiles/Tile";
import RenderEngine from "../../RenderEngine";
import AssetManager, { AssetNames } from "../AssetManager";
import { EntityNames } from "./EntityManager";
import EntityProperties from "./EntityProperties";

export default interface Entity {
    id: string;

    model?: Object3D;
    relativePosition: Vector3;
    entityProperties: EntityProperties;
    currentTile: Tile;

    isLoaded: () => boolean;
    load: () => Promise<Entity>;
    unload: () => void;
    clone: () => Entity

    place: (tile: Tile) => void;
    isPlaceable: (tile: Tile) => boolean;
}

export abstract class BaseEntity implements Entity {
    public readonly id: string;
    public readonly entityProperties: EntityProperties;
    public readonly relativePosition: Vector3;
    public model?: Object3D;

    public currentTile: Tile;

    protected readonly renderEngine: RenderEngine;

    private readonly name: EntityNames;
    private readonly assetName: AssetNames;

    constructor(name: EntityNames,
                modelLoader: AssetNames,
                renderEngine: RenderEngine,
                entityProperties: EntityProperties,
                relativePosition?: Vector3) {
        this.name = name;
        this.assetName = modelLoader;
        this.entityProperties = entityProperties;
        this.renderEngine = renderEngine;
        this.id = generateUUID()
        this.relativePosition = relativePosition || new Vector3();
    }

    abstract init(model: Object3D, newInstance?: boolean): Entity | undefined

    isLoaded(): boolean {
        return !!this.model;
    }

    load(): Promise<Entity> {
        return new Promise(resolve => {
            AssetManager.getOrLoadAsset(this.assetName).then(model => {
                this.init(model);
                this.model = model;
                this.model.traverse(ob => {
                    if (ob instanceof Mesh) {
                        ob.userData.entityName = this.name;
                        ob.userData.entityId = this.id;
                    }
                });

                resolve(this);
            })
        })
    }

    unload() {
        this.renderEngine.remove(this.model);
    }

    clone(): Entity {
        if (!this.isLoaded()) {
            throw `Cannot clone entities that are not loaded`;
        }

        const model = AssetManager.getAsset(this.assetName, true);
        const clone = this.init(model, true) as Entity;
        model.traverse(ob => {
            if (ob instanceof Mesh) {
                ob.userData.entityName = this.name;
                ob.userData.entityId = clone.id;
            }
        });

        return clone;
    }

    place(tile: Tile): void {
        if (!this.isLoaded()) {
            throw 'Object not loaded, cannot place';
        }

        const model = this.model as Object3D;

        tile.entities.push(this);
        model.position.set(tile.position.x + this.relativePosition.x, this.relativePosition.y, tile.position.z + this.relativePosition.z);
        this.currentTile = tile;
        this.renderEngine.add(this.model);
    }

    abstract isPlaceable(tile: Tile): boolean;
}