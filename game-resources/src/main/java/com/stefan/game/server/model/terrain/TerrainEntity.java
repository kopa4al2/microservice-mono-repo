package com.stefan.game.server.model.terrain;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Table("terrain_tile")
public record TerrainEntity(@Id Long id, int mapIndex, String name, String asset) {

}
