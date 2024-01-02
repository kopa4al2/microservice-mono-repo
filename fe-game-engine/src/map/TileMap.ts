import Tile from "./tiles/Tile";
import { Object3D, Vector2, Vector3 } from "three";
import MountainTile from "./tiles/MountainTile";
import GrassTile from "./tiles/GrassTile";
import TileDimensions from "./TIleDimensions";
import RenderEngine from "../RenderEngine";
import WaterTile from "./tiles/WaterTile";

// TODO: This will come from the backend
export const map = [
    Array.of(2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    Array.of(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
]

class TileMap {

    public static SPACING = 1;
    // public static SPACING = 1.06;
    // public static SPACING = 1.03;

    public readonly tileGrid: Tile[][];
    public readonly tileModels: Object3D[] = [];

    private readonly mapGrid: number[][];


    constructor(mapGrid: number[][], public renderEngine: RenderEngine) {
        this.mapGrid = mapGrid;
        this.tileGrid = [...Array(mapGrid.length)].map(e => Array(mapGrid[0].length));
    }

    public getTile(x: number, y: number): Tile {
        return this.tileGrid[x][y];
    }

    init(): void {
        // loadMap
        // initialize tiles

        TileDimensions.initDimensions();
        const { hexRadius, hexHeight } = TileDimensions;

        const gridWidth = this.mapGrid.length * (3 / 2) * hexRadius * TileMap.SPACING;
        const gridHeight = map[0].length * hexHeight * TileMap.SPACING + (hexHeight / 2) * TileMap.SPACING;
        const xOffset = -gridWidth / 2;
        const zOffset = -gridHeight / 2;

        // i - row; j - column
        for (let i = 0; i < this.mapGrid.length; i++) {
            for (let j = 0; j < this.mapGrid[i].length; j++) {
                const x = j * (3 / 2) * hexRadius * TileMap.SPACING + xOffset;
                const y = 0;
                const z = i * hexHeight * TileMap.SPACING + (j % 2) * (hexHeight / 2) * TileMap.SPACING + zOffset;

                const tileCode = this.mapGrid[i][j];
                const tile = this.createTile(tileCode, new Vector2(i, j), new Vector3(x, y, z));

                this.tileModels.push(tile.model);
                this.tileGrid[i][j] = tile;
            }
        }
    }

    createTile(tileCode: number, gridPosition: Vector2, scenePosition: Vector3): Tile {
        switch (tileCode) {
            case 1:
                return new MountainTile(gridPosition, scenePosition, this, this.renderEngine);
            case 0:
                return new GrassTile(gridPosition, scenePosition, this, this.renderEngine);
            case 2:
                return new WaterTile(gridPosition, scenePosition, this, this.renderEngine);
        }

        throw `Unknown tile code: ${ tileCode }. Please provide appropriate mapping`;
    }

    isOutsideGrid(point: { x: number; y: number }): boolean {
        return point.x < 0 || point.y < 0 || point.x >= this.tileGrid.length || point.y >= this.tileGrid[0].length;
    }
}

export default TileMap;