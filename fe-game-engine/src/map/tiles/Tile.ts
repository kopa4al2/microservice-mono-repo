import { Color, Mesh, Object3D, Vector2, Vector3 } from "three";
import TileMap from "../TileMap";
import PriorityQueue from "../../data-structures/PriorityQueue";
import Entity from "../../models/entities/Entity";
import RenderEngine from "../../RenderEngine";


export interface TileProperties {
    isWater?: boolean;
    isGrass?: boolean;
    isMountain?: boolean;
}
/**
 * y - row
 * x - column
 */
export default abstract class Tile {

    public readonly name: string;
    public readonly position: Vector3;
    public readonly gridPosition: Vector2;
    public readonly properties: TileProperties;

    public readonly entities: Entity[];
    public readonly model: Object3D;

    private readonly tileMap: TileMap;
    private readonly renderEngine: RenderEngine;

    private readonly _originalColor: Color;

    protected constructor(name: string,
                          gridXY: Vector2,
                          sceneXYZ: Vector3,
                          properties: TileProperties,
                          model: Object3D,
                          map: TileMap,
                          renderEngine: RenderEngine) {
        this.name = name;
        this.position = sceneXYZ;
        this.gridPosition = gridXY;
        this.properties = properties;
        this.entities = [];
        this.model = model;
        this.tileMap = map;
        this.renderEngine = renderEngine;
        this._originalColor = new Color();
        this.init(renderEngine);
    }

    init(game: RenderEngine): void {
        this.model.position.copy(this.position);
        this.model.traverse(ob => {
            if (ob instanceof Mesh) {
                ob.userData.gridXY = this.gridPosition;
                ob.userData.position = this.position;
                this._originalColor.set(ob.material.color);
            }
        });
        game.add(this.model);
    }

    get originalColor(): Color {
        return this._originalColor.clone();
    }

    /**
     * Axial q coordinate - the column offset of the tile.
     */
    get q(): number {
        return this.gridPosition.y;
    }

    /**
     * Axial r coordinate - the row offset of the tile.
     */
    get r(): number {
        return this.gridPosition.x - Math.floor(this.gridPosition.y / 2);
    }

    /**
     * Get the axial distance between 2 tiles.
     *
     * @param target the target tile.
     */
    distance(target: Tile): number {
        const deltaX = Math.abs(this.q - target.q);
        const deltaY = Math.abs(this.r - target.r);
        const deltaZ = Math.abs(-this.q - this.r + target.q + target.r);

        return Math.max(deltaX, deltaY, deltaZ);
    }

    getNeighbours(): Tile[] {
        const { x, y } = this.gridPosition;
        const isEvenRow = y % 2 === 0;

        const evenNeighbours = [
            { di: -1, dj: -1 }, // Top-Left
            { di: 0, dj: -1 },  // Top-Right
            { di: 1, dj: 0 },   // Right
            { di: 0, dj: 1 },   // Bottom-Right
            { di: -1, dj: 1 },  // Bottom-Left
            { di: -1, dj: 0 }   // Left
        ]
        const oddNeighbours = [
            { di: 0, dj: -1 },  // Top-Left
            { di: 1, dj: -1 },  // Top-Right
            { di: 1, dj: 0 },   // Right
            { di: 1, dj: 1 },   // Bottom-Right
            { di: 0, dj: 1 },   // Bottom-Left
            { di: -1, dj: 0 }   // Left
        ]

        const neighbors = isEvenRow ? evenNeighbours : oddNeighbours;

        return neighbors
            .map(neighbor => ({
                x: x + neighbor.di,
                y: y + neighbor.dj
            }))
            .filter(point => !this.tileMap.isOutsideGrid(point))
            .map((point) => this.tileMap.getTile(point.x, point.y));
    }

}