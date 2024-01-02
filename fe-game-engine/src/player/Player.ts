import { Color } from "three";

export default class Player {
    color: Color;
    name: string;


    constructor(name: string, color: Color) {
        this.color = color;
        this.name = name;
    }
}