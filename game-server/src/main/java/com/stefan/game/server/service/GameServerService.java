package com.stefan.game.server.service;

import com.stefan.game.server.model.PlayerTurn;
import com.stefan.game.server.model.PlayerTurnResponse;
import com.stefan.gameserviceapi.Game;

/**
 * @author Stefan Ivanov
 * @since 21.11.2022
 */
public interface GameServerService {

    void startGame(Game game);

    void connect(Long gameId, Long playerId);

    void disconnect(Long gameId, Long playerId);

    PlayerTurnResponse playerTurn(Long gameId, PlayerTurn playerTurnCommand);

}
