package com.stefan.gameresourceeapi;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Getter
@Setter
@NoArgsConstructor
public class TerrainResource extends AbstractGameResource {

    private int mapIndex;

    public TerrainResource(Long id, String name, String asset, int mapIndex) {
        super(id, name, asset);
        this.mapIndex = mapIndex;
    }
}

