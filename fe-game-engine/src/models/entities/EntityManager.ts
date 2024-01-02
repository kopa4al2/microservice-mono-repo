import { Object3D } from "three";
import RenderEngine from "../../RenderEngine";
import House2 from "./buildings/House2";
import House1 from "./buildings/House1";
import Entity from "./Entity";
import ArcDeva from "./movable/ArcDeva";
import Boat from "./movable/Boat";
import Dragon from "./movable/Dragon";

export enum EntityNames {
    DRAGON = 'DRAGON',
    HOUSE2 = 'HOUSE2',
    HOUSE1 = 'HOUSE1',
    ARC_DEVA = 'ARC_DEVA',
    BOAT = 'BOAT',
}

export default class EntityManager {

    readonly entities = new Map<EntityNames, Entity>();

    readonly loadedEntities = new Map<string, Entity>();

    constructor(renderEngine: RenderEngine) {
        this.entities.set(EntityNames.DRAGON, new Dragon(renderEngine));
        this.entities.set(EntityNames.HOUSE2, new House2(renderEngine));
        this.entities.set(EntityNames.HOUSE1, new House1(renderEngine));
        this.entities.set(EntityNames.ARC_DEVA, new ArcDeva(renderEngine));
        this.entities.set(EntityNames.BOAT, new Boat(renderEngine));
    }

    loadAll(entities: EntityNames[]): Promise<Entity[]> {
        const promises = entities
            .map(entity => this.entities.get(entity))
            .filter(entity => !!entity && !entity.isLoaded())
            .map(e => (e as Entity).load());


        return new Promise(resolve => Promise.all(promises)
            .then((entities) => {
                const cloned = entities.map(e => e.clone());
                cloned.forEach(e => this.loadedEntities.set(e.id, e))
                resolve(cloned);
            }));
    }

    removeEntity(entity: Entity) {
        const e = this.loadedEntities.get(entity.id);

        if (e) {
            e.unload();
            this.loadedEntities.delete(entity.id);
            return;
        }

        console.warn('Tried to remove not existing entity');
    }

    createEntity(name: EntityNames): Entity {
        const entity = this.entities.get(name);
        if (!entity || !entity.isLoaded) {
            throw `Entity ${ name } is not loaded ${ entity }`;
        }

        const clone = entity.clone();
        this.loadedEntities.set(clone.id, clone);

        return clone;
    }

    getEntity(id: string): Entity {
        if (!this.loadedEntities.has(id)) {
            console.error(this.entities)
            console.error(this.loadedEntities)
            throw `Entity with id: ${ id } not loaded`;
        }

        return this.loadedEntities.get(id) as Entity;
    }

    getPlacedEntities() {
        const loadedEntities: Object3D[] = [];
        for (let entity of this.loadedEntities.values()) {
            if (!entity.isLoaded()) {
                console.error(this.entities);
                throw `Not loaded entity in loaded entities: ${entity.id}`;
            }

            if (entity.currentTile) {
                loadedEntities.push(entity.model as Object3D);
            }
        }

        return loadedEntities;
    }
}