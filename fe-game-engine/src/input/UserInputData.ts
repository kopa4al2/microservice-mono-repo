import { Vector2 } from "three";

export default class UserInputData {

    public mousePosition: Vector2;
    public keysPressed: string[];
    public hoveredHtmlElement?: HTMLElement;

    constructor(mousePosition: Vector2 = new Vector2(),
                keyPressed: string[] = []) {
        this.mousePosition = mousePosition;
        this.keysPressed = keyPressed;
    }
}