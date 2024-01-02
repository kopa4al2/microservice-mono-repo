import { LitElement, html, css } from 'lit-element';
import { customElement, property } from 'lit-element/decorators.js';


@customElement('initial-menu')
export default class InitialMenu extends LitElement {
    @property()
    onCreateGame: () => void;
    @property()
    onJoinGame: () => void;

    render() {
        return html`
            <style>
                /* Define component styles within the shadow DOM */
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
            <div class="options">
                <div class="menu-option create-game" @click=${() => this.onCreateGame()}>Create Game</div>
                <div class="menu-option join-game" @click=${this.onJoinGame}>Join Game</div>
            </div>
        `;
    }
}