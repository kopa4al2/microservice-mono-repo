package com.stefan.game.server.model.building;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Table("building")
public record BuildingEntity(@Id Long id, String name, String asset) {
}
