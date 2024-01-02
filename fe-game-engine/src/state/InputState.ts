import UserInputData from "../input/UserInputData";
import InputManager from "./InputManager";

export default interface InputState {
    onClick(inputManager: InputManager): void;

    onRightClick(inputManager: InputManager): void;

    onMouseMove(inputManager: InputManager): void;
}