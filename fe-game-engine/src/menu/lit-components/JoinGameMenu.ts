import { LitElement, html, css } from 'lit-element';
import { customElement, property } from 'lit-element/decorators.js';


@customElement('join-game-menu')
export default class JoinGameMenu extends LitElement {

    render() {
        return html`
            <style>
                
            </style>
            <div>
                List of lobbies will be fetched here
            </div>
        `;
    }
}