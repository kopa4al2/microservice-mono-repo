package com.stefan.game.server.service;

import com.stefan.game.server.model.PlayerTurn;
import com.stefan.game.server.model.PlayerTurnResponse;
import com.stefan.game.server.model.game.GameInstance;
import com.stefan.gameserviceapi.Game;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Service
public class GameServerServiceImpl implements GameServerService {

    private final ConcurrentMap<Long, GameInstance> activeGames;

    public GameServerServiceImpl() {
        activeGames = new ConcurrentHashMap<>();
    }

    @Override
    public void startGame(Game game) {
        if (this.activeGames.containsKey(game.getId())) {
            throw new IllegalArgumentException("Game has already started");
        }

        this.activeGames.put(game.getId(), new GameInstance(game.getId(), game.getPlayers()));
    }

    @Override
    public void connect(Long gameId, Long playerId) {
        this.activeGames.get(gameId).connect(playerId);
    }

    @Override
    public void disconnect(Long gameId, Long playerId) {
        this.activeGames.get(gameId).disconnect(playerId);
    }

    @Override
    public PlayerTurnResponse playerTurn(Long gameId, PlayerTurn playerTurnCommand) {
        var game = Optional.ofNullable(activeGames.get(gameId))
                .orElseThrow(() -> new IllegalArgumentException("No active game with id: " + gameId));

        return game.executeTurn(playerTurnCommand);
    }


}
