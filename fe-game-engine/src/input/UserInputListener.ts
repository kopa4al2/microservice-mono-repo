import UserInputData from "./UserInputData";
import InputManager from "../state/InputManager";

export default class UserInputListener {

    inputManager: InputManager;
    userInput: UserInputData;

    constructor(inputManager: InputManager) {
        this.inputManager = inputManager;
        this.userInput = new UserInputData();
    }

    init() {
        document.addEventListener('mousemove', event => {
            this.userInput.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.userInput.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.inputManager.handleMouseMove(this.userInput)
        })


        document.addEventListener('click', event => {
            const menuItem = document.elementFromPoint(event.clientX, event.clientY);
            if (menuItem && menuItem.classList.contains('menu-item')) {
                this.userInput.hoveredHtmlElement = menuItem as HTMLElement;
            } else {
                this.userInput.hoveredHtmlElement = undefined;
            }
            this.inputManager.handleClick(this.userInput);
        })

        document.addEventListener('contextmenu', event => {
            event.preventDefault();
            this.inputManager.handleRightClick(this.userInput);
        })
    }
}