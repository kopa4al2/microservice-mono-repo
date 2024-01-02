import UserInputListener from "./input/UserInputListener";
import TileMap, { map } from "./map/TileMap";
import GameMenu from "./menu/GameMenu";
import AssetManager from "./models/AssetManager";
import EntityManager, { EntityNames } from "./models/entities/EntityManager";
import RenderEngine from "./RenderEngine";
import InputManager from "./state/InputManager";
import ColorUtils from "./utils/ColorUtils";
import InitialMenu from "./menu/lit-components/InitialMenu";

document.body.onload = () => {

    // init game menu
    const gameMenu = new GameMenu(document.querySelector('.menu-overlay') as HTMLElement);
    gameMenu.init();
}

// AssetManager.loadTileAssets().then(() => {
//     const renderEngine = new RenderEngine({
//         webgl2: true,
//         grid: false,
//         container: document.querySelector('.canvas-wrapper')
//     });
//     const entityManager = new EntityManager(renderEngine);
//     const gameMap = new TileMap(map, renderEngine);
//     const inputManager = new InputManager(renderEngine, gameMap, entityManager);
//     const userInputListener = new UserInputListener(inputManager);
//
//     renderEngine
//         .setCamera(180, 28, 20, [0, 1.0, 0])
//         .render();
//
//     gameMap.init();
//     userInputListener.init();
//
//     const allEntities: EntityNames[] = Object.values(EntityNames);
//
//     entityManager.loadAll(allEntities).then(loaded => {
//         let i = 12;
//         loaded.forEach(entity => {
//             entity.place(gameMap.getTile(15, i++));
//         })
//     })
//
//
//     /*   entityManager.loadAll(EntityNames.BOAT, EntityNames.DRAGON, EntityNames.ARC_DEVA, EntityNames.HOUSE2).then(entities => {
//            const dragon = entities[0];
//            const market = entities[1];
//            const oldHouse = entities[3];
//
//            console.log(entities)
//            dragon.place(gameMap.getTile(15, 13));
//            market.place(gameMap.getTile(15, 15));
//            oldHouse.place(gameMap.getTile(15, 16));
//
//            renderEngine.onRender = () => {
//            }
//        })*/
//
//
//     // DEBUGGING
//     // @ts-ignore
//     window.color = ColorUtils
//     // @ts-ignore
//     window.entityManage = entityManager;
// })