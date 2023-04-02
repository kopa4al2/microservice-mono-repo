package com.stefan.game.server.model.game.map;

import java.util.Objects;

/**
 * @author Stefan Ivanov
 * @since 24.11.2022
 */
public class Hex {
    private final int x;
    private final int y;
    private final int z;

    public Hex(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
        assert(x + y + z == 0);
    }

    public static Hex hexAdd(Hex a, Hex b) {
        return new Hex(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    public static Hex hexSubtract(Hex a, Hex b) {
        return new Hex(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    public static Hex hexMultiply(Hex a, int k) {
        return new Hex(a.x * k, a.y * k, a.z * k);
    }

    public static int hexLength(Hex hex) {
        return (Math.abs(hex.x) + Math.abs(hex.y) + Math.abs(hex.z)) / 2;
    }

    public static int hexDistance(Hex a, Hex b) {
        return hexLength(hexSubtract(a, b));
    }

    public static Hex[] hexDirections = {
            new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
            new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)
    };

    public static Hex hexDirection(int direction /* 0 to 5 */) {
        assert (0 <= direction && direction < 6);
        return hexDirections[direction];
    }

    public static Hex hexNeighbor(Hex hex, int direction) {
        return hexAdd(hex, hexDirection(direction));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hex hex = (Hex) o;
        return x == hex.x && y == hex.y && z == hex.z;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, z);
    }
}
