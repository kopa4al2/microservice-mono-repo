package com.stefan.players.model.player;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Table("players")
public record PlayerEntity(@Id Long id, Long userId, String nickname, String description) {
}
