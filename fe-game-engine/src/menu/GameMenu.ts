import { LitElement } from "lit-element";
import { Event } from "three";
import { detach } from "three/examples/jsm/utils/SceneUtils";
import Game from "../game/Game";
import { CreateLobbyEvent, EventType, StartGameEvent } from "./Events";
import CreateGameMenu from "./lit-components/CreateGameMenu";
import InGameMenu from "./lit-components/InGameMenu";
import InitialMenu from "./lit-components/InitialMenu";
import JoinGameMenu from "./lit-components/JoinGameMenu";
import LobbyMenu from "./lit-components/LobbyMenu";

enum GameMenuState {
    INITIAL,
    START_GAME,
    JOIN_GAME,
    IN_GAME
}

export default class GameMenu {

    menuWrapper: HTMLElement;
    wrapperClone: HTMLElement;
    currentActive: HTMLElement;

    static CURRENT_MENU_STATE: LitElement;
    static INITIAL_MENU: InitialMenu;
    static CREATE_GAME_MENU: CreateGameMenu;
    static JOIN_GAME_MENU: JoinGameMenu;
    static LOBBY_MENU: LobbyMenu;
    static IN_GAME_MENU: InGameMenu;

    static GAME: Game;

    constructor(menuElement: HTMLElement) {
        this.menuWrapper = menuElement;
        this.currentActive = menuElement;
    }

    init() {
        GameMenu.INITIAL_MENU = new InitialMenu();
        GameMenu.CREATE_GAME_MENU = new CreateGameMenu();
        GameMenu.JOIN_GAME_MENU = new JoinGameMenu();
        GameMenu.LOBBY_MENU = new LobbyMenu();
        GameMenu.IN_GAME_MENU = new InGameMenu();

        GameMenu.INITIAL_MENU.onCreateGame = () => this.setState(GameMenu.CREATE_GAME_MENU);
        GameMenu.INITIAL_MENU.onJoinGame = () => this.setState(GameMenu.JOIN_GAME_MENU);

        GameMenu.CREATE_GAME_MENU.onBackClicked = () => this.setState(GameMenu.INITIAL_MENU);
        GameMenu.CREATE_GAME_MENU.addEventListener(EventType.CREATE_LOBBY,
            (e: Event) => this.createLobby((e as CustomEvent<CreateLobbyEvent>).detail));

        GameMenu.LOBBY_MENU.onBackClicked = () => this.setState(GameMenu.INITIAL_MENU);
        GameMenu.LOBBY_MENU.addEventListener(EventType.START_GAME,
            (e: Event) => this.startGame((e as CustomEvent<StartGameEvent>).detail));

        this.wrapperClone = this.menuWrapper.cloneNode(true) as HTMLElement;

        this.menuWrapper.parentNode?.append(this.wrapperClone);

        setTimeout(() => {
            this.setState(GameMenu.INITIAL_MENU);
        }, 100)
    }

    private createLobby(data: CreateLobbyEvent) {
        GameMenu.LOBBY_MENU.name = data.lobbyName;
        GameMenu.LOBBY_MENU.players = [data.playerName];
        this.setState(GameMenu.LOBBY_MENU)
    }

    setState(nextState: LitElement) {
        const nextActive = this.currentActive === this.menuWrapper ? this.wrapperClone : this.menuWrapper;
        this.currentActive.style.transform = 'translateY(100%)';
        nextActive.style.transform = 'translateY(0)';
        nextActive.append(nextState);

        nextActive.ontransitionend = (e) => {
            this.currentActive.ontransitionend = () => {
            };
            const currentState = GameMenu.CURRENT_MENU_STATE;
            currentState?.remove();
            GameMenu.CURRENT_MENU_STATE = nextState;
            this.currentActive = nextActive;
        }

    }

    private startGame(data: StartGameEvent) {
        const { players } = data;

        if (GameMenu.GAME) {
            console.error(GameMenu.GAME);
            throw 'Game already created, cannot created another one: ';
        }

        GameMenu.GAME = new Game(players);
        GameMenu.GAME.start();
        this.setState(GameMenu.IN_GAME_MENU);
    }
}