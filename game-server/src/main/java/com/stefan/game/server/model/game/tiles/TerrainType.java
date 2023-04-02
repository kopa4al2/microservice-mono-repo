package com.stefan.game.server.model.game.tiles;

import java.util.Arrays;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
public enum TerrainType {
    WATER(0),
    GRASS_1(1),
    GRASS_2(2),
    GRASS_3(3),
    WASTELAND(4),
    SNOW(5),
    RIVER(6),
    MOUNTAIN(7),
    START_POS(8);

    private final int mappingIndex;

    TerrainType(int i) {
        this.mappingIndex = i;
    }

    public int getMappingIndex() {
        return mappingIndex;
    }

    public static TerrainType fromIndex(int index) {
        return Arrays.stream(values()).filter(t -> t.getMappingIndex() == index)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No tile with index: " + index));
    }
}
