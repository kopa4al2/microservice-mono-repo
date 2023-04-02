package com.stefan.game.server.model.unit;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Table("unit")
public record UnitEntity(@Id Long id, String name, String asset) {
}
