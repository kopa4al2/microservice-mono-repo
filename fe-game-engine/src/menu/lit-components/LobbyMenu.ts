import { LitElement, html, css } from 'lit-element';
import { customElement, property } from 'lit-element/decorators.js';
import { CreateLobbyEvent, EventType, StartGameEvent } from "../Events";


@customElement('lobby-menu')
export default class LobbyMenu extends LitElement {
    @property()
    name :string;
    @property()
    password :string;

    @property()
    host :string;
    @property()
    players :string[];
    @property()
    playersReadyState :boolean[];

    @property()
    onBackClicked :() => void;


    startGame() {
        const { players } = this;

        this.dispatchEvent(new CustomEvent<StartGameEvent>(EventType.START_GAME, {
            detail: { players },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <style>
            </style>
            <div class="lobby">
                <h2 class="lobby-name">${this.name}</h2>
                <button @click=${this.onBackClicked}>Back</button>
                <button @click=${this.startGame}>Start</button>
            </div>
        `;
    }
}