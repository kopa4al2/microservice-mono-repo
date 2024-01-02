import UserInputData from "./UserInputData";
import TileMap from "../map/TileMap";
import RenderEngine from "../RenderEngine";

export default abstract class AbstractCommand {

    protected map: TileMap;
    protected game: RenderEngine;

    protected constructor(map: TileMap, game: RenderEngine) {
        this.map = map;
        this.game = game;
    }

    abstract execute(input: UserInputData) :void;
}