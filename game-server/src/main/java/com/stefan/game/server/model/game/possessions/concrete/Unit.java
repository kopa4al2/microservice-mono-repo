package com.stefan.game.server.model.game.possessions.concrete;

import com.stefan.game.server.model.game.possessions.AbstractPossession;
import lombok.Data;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
public class Unit extends AbstractPossession {

    private String name;
    private String id;
    private Long playerId;

}
