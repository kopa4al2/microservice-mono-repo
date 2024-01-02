import { html, LitElement } from 'lit-element';
import { customElement, property } from 'lit-element/decorators.js';
import { CreateLobbyEvent, EventType } from "../Events";


@customElement('create-game-menu')
export default class CreateGameMenu extends LitElement {
    @property()
    onBackClicked: () => void;
    @property()
    onCreateClicked: () => void;

    @property()
    protected playerName: string = 'stefan';
    @property()
    protected lobbyName: string = 'name';
    @property()
    protected lobbyPassword: string = '';

    handleCreate() {
        const { lobbyPassword, lobbyName, playerName } = this;

        this.dispatchEvent(new CustomEvent<CreateLobbyEvent>(EventType.CREATE_LOBBY, {
            detail: { lobbyPassword, lobbyName, playerName },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <style>
                :host .options {
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                }

                :host .menu-option {
                    background-color: #3498db;
                    color: #fff;
                    cursor: pointer;
                    user-select: none;
                    margin: 10px 0;
                    text-align: center;
                }
            </style>
            <div class="create-game">
                <div class="form-group">
                    <label for="player-name">Player name:</label>
                    <input id="player-name"
                           type="text"
                           @input=${ (e: InputEvent) => this.playerName = (e.target as HTMLInputElement).value }
                           .value=${ this.playerName }/>
                </div>
                <div class="form-group">
                    <label for="lobby-name">Lobby name:</label>
                    <input id="lobby-name"
                           type="text"
                           @input=${ (e: InputEvent) => this.lobbyName = (e.target as HTMLInputElement).value }
                           .value=${ this.lobbyName }/>
                </div>
                <div class="form-group">
                    <label for="lobby-password">Lobby password:</label>
                    <input id="lobby-password"
                           type="password"
                           @input=${ (e: InputEvent) => this.lobbyPassword = (e.target as HTMLInputElement).value }
                           .value=${ this.lobbyPassword }/>
                </div>

                <button @click=${ this.onBackClicked }>Back</button>
                <button @click=${ this.handleCreate }>Create</button>
            </div>
        `;
    }
}