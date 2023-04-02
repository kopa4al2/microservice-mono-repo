package com.stefan.game.server.model.api;

import com.stefan.gameserviceapi.Game;
import com.stefan.gameserviceapi.GameState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDtoImpl implements Game {

    private Long id;
    private GameState gameState;
    private List<PlayerDtoImpl> players;

}
