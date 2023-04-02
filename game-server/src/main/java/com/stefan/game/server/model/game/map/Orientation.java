package com.stefan.game.server.model.game.map;

import static java.lang.Math.sqrt;

/**
 * @author Stefan Ivanov
 * @since 24.11.2022
 */
public record Orientation(double f0, double f1, double f2, double f3,
                          double b0, double b1, double b2, double b3,
                          double start_angle) {

    public static Orientation pointy() {
        return new Orientation(sqrt(3.0), sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0,
                sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0,
                0.5);
    }

    public static Orientation layoutFlat() {
        return new Orientation(3.0 / 2.0, 0.0, sqrt(3.0) / 2.0, sqrt(3.0),
                2.0 / 3.0, 0.0, -1.0 / 3.0, sqrt(3.0) / 3.0,
                0.0);
    }

}
