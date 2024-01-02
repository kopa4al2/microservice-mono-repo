import { Color, Mesh, Object3D } from "three";
import Entity from "../models/entities/Entity";

export default class ColorUtils {

    private constructor() {
    }

    static readonly HOVER_ENTITY_COLOR = "#FFba00";
    static readonly SELECT_ENTITY_COLOR = "#1abaff";

    static readonly PATH_COLOR = new Color(32, 182, 89);
    static readonly CONFIRM_PATH_COLOR = new Color(10, 24, 89);
    static readonly ERROR_COLOR = new Color(233, 24, 22);
    // static readonly AVAILABLE_COLOR = new Color(233, 24, 22);


    static hoverMesh(model?: Object3D) {
        if (!model) {
            return;
        }

        model.traverse(o => {
            if (o instanceof Mesh) {
                const { color } = o.material;
                const targetColor = new Color(color.r + 50, color.g + 50, color.b + 50);
                color.lerp(targetColor, 0.05);
            }
        });
    }

    static paintMesh(model?: Object3D, color?: Color) {
        if (!model) {
            return;
        }

        model.traverse(o => {
            if (o instanceof Mesh) {
                o.material.color = color;
            }
        });
    }

    static createRandomColor(): Color {
        // Generate random values for RGB
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        return new Color(r, g, b);
    }
}