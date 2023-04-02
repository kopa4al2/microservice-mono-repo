package com.stefan.game.server.model.game.possessions.concrete;

import com.stefan.game.server.model.game.possessions.AbstractPossession;
import lombok.Data;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Table("building")
public class Building extends AbstractPossession {
}
