package com.stefan.game.server.model.game.map;

import com.stefan.game.server.model.game.Coordinates;

/**
 * @author Stefan Ivanov
 * @since 24.11.2022
 */
public record Layout(Orientation orientation,
                     Coordinates size,
                     Coordinates origin) {
}
