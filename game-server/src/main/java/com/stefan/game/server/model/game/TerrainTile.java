package com.stefan.game.server.model.game;

import org.springframework.data.annotation.Id;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
public record TerrainTile(@Id Long id, int mapIndex, String terrainName, String asset) {

}
