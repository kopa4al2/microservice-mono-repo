package com.stefan.game.server.model.game.possessions;

import lombok.Data;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Data
public abstract class AbstractPossession implements PlayerPossession {

    private String name;
    private String id;
    private Long playerId;

}
