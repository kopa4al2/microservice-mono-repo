import * as TWEEN from "@tweenjs/tween.js";
import { Object3D, Vector3 } from "three";
import PriorityQueue from "../../../data-structures/PriorityQueue";
import Tile from "../../../map/tiles/Tile";
import RenderEngine from "../../../RenderEngine";
import { AssetNames } from "../../AssetManager";
import { BaseEntity } from "../Entity";
import { EntityNames } from "../EntityManager";
import EntityProperties from "../EntityProperties";

export default abstract class MovableEntity extends BaseEntity {

    isMoving: boolean;

    protected constructor(name: EntityNames,
                          modelLoader: AssetNames,
                          renderEngine: RenderEngine,
                          entityProperties: EntityProperties) {
        super(name, modelLoader, renderEngine, entityProperties);
    }

    moveTo(path: Tile[], onTileChange: (tile: Tile) => void): void {
        if (path.length <= 1) {
            console.warn("Tried to move entity on unsupported path: ", path);
        }

        this.isMoving = true;
        // start from 1, since 0 is the current tile
        this.moveRecursively(1, path, onTileChange);
    }

    private moveRecursively(index: number, path: Tile[], onTileChange: (tile: Tile) => void) {
        if (index >= path.length) { // bottom
            this.isMoving = false;
            onTileChange(path[path.length - 1]);

            return;
        }

        const tile = path[index];
        this.rotateAndMove(tile)
            .onComplete(() => {
                tile.entities.push(this);
                this.currentTile.entities.pop();
                this.currentTile = tile;
                setTimeout(() => {
                    this.moveRecursively(index + 1, path, onTileChange);
                }, 250)

                onTileChange(path[index - 1]);
            })
            .start();
    }

    private rotateAndMove(tile: Tile): TWEEN.Tween<any> {
        const model = this.model as Object3D;
        const startRotation = model.quaternion.clone();
        model.lookAt(new Vector3(tile.position.x, 1, tile.position.z));
        const endRotation = model.quaternion.clone();
        model.quaternion.copy(startRotation);

        const lookAtTween = new TWEEN.Tween(model.quaternion)
            .to(endRotation, 100)
            .easing(TWEEN.Easing.Exponential.Out)
        const moveTween = new TWEEN.Tween<any>(model.position)
            .to({ x: tile.position.x + this.relativePosition.x, z: tile.position.z + this.relativePosition.z }, 300)

        return lookAtTween.chain(moveTween)
    }

    /**
     * Use A* algorithm to find the shortest path between the current and the target tile.
     *
     * @param target the target tile.
     */
    findShortestPath(target: Tile): Tile[] {
        if (target == this.currentTile) {
            return [];
        }
        const path = new Set<Tile>();
        const frontier = new PriorityQueue<[Tile, number]>(
            (t: [Tile, number], t2: [Tile, number]) => t[1] < t2[1]);

        frontier.push([this.currentTile, 0]);
        const cameFrom = new Map<Tile, Tile>();
        const costSoFar = new Map<Tile, number>();

        costSoFar.set(this.currentTile, 0);

        while (!frontier.isEmpty()) {
            let current = frontier.pop()[0];
            if (current == target) {
                break;
            }

            current.getNeighbours()
                .filter(neighbour => this.canMove(neighbour))
                .forEach(neighbour => {
                    const newCost = (costSoFar.get(current) || 0) + current.distance(neighbour);

                    if (!costSoFar.get(neighbour) || newCost < (costSoFar.get(neighbour) as number)) {
                        costSoFar.set(neighbour, newCost);
                        const priority = newCost + neighbour.distance(target);
                        frontier.push([neighbour, priority])
                        cameFrom.set(neighbour, current);
                    }
                })
        }

        let current = target;
        path.add(current);

        let i = 0;
        while (cameFrom.get(current) && cameFrom.get(current) != this.currentTile) {
            if (i++ > 2000) {
                console.log('Encountered too long path: ', path);
                break;
            }
            current = cameFrom.get(current) as Tile;
            path.add(current);
        }
        path.add(this.currentTile);

        return Array.from(path).reverse();
    }

    canMove(tile: Tile):boolean {
        return tile.entities.length === 0 && this.isPlaceable(tile);
    }

    // TODO:
    moveCost(tile: Tile): number {
        return 1;
    }
}