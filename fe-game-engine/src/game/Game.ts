import { Color } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import UserInputListener from "../input/UserInputListener";
import TileMap, { map } from "../map/TileMap";
import AssetManager from "../models/AssetManager";
import EntityManager, { EntityNames } from "../models/entities/EntityManager";
import Player from "../player/Player";
import RenderEngine from "../RenderEngine";
import InputManager from "../state/InputManager";
import ColorUtils from "../utils/ColorUtils";


const colorMap = [new Color('blue'), new Color('red'), new Color('magenta')];
export default class Game {

    currentTurn: number;
    currentPlayer: Player;
    players: Player[];


    constructor(players: string[]) {
        this.currentTurn = 1;
        this.players = players.map((p, i) => new Player(p, colorMap[i]));
        this.currentPlayer = this.players[0];
    }

    start() {
        AssetManager.loadTileAssets().then(() => {
            const renderEngine = new RenderEngine({
                webgl2: true,
                grid: false,
                container: document.querySelector('.canvas-wrapper')
            });
            const entityManager = new EntityManager(renderEngine);
            const gameMap = new TileMap(map, renderEngine);
            const inputManager = new InputManager(renderEngine, gameMap, entityManager);
            const userInputListener = new UserInputListener(inputManager);

            renderEngine
                .setCamera(180, 28, 20, [0, 1.0, 0])
                .render();

            gameMap.init();
            userInputListener.init();

            const allEntities: EntityNames[] = Object.values(EntityNames);

            entityManager.loadAll(allEntities).then(loaded => {
                let i = 12;
                loaded.forEach(entity => {
                    entity.place(gameMap.getTile(15, i++));
                })
            })

            // DEBUGGING
            // @ts-ignore
            window.color = ColorUtils
            // @ts-ignore
            window.entityManage = entityManager;
        })
    }
}