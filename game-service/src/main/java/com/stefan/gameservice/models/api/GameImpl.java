package com.stefan.gameservice.models.api;


import com.stefan.gameserviceapi.Game;
import com.stefan.gameserviceapi.GameState;
import com.stefan.gameserviceapi.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 15.11.2022
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameImpl implements Game {
    private Long id;
    private GameState gameState;
    private List<Player> players;
}
