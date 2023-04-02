package com.stefan.game.server.model.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Table("terrain_tile")
public record TerrainEntity(@Id Long id, @Column("map_index") int mapIndex, String name, String asset) {

}
