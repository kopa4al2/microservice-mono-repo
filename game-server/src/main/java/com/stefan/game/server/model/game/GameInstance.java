package com.stefan.game.server.model.game;

import com.stefan.game.server.model.PlayerTurn;
import com.stefan.game.server.model.PlayerTurnResponse;
import com.stefan.game.server.model.game.possessions.PlayerPossession;
import com.stefan.gameserviceapi.Player;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Slf4j
public class GameInstance {

    private final Long gameId;
    private final Map<Long, Player> expectedPlayers;
    private final List<GamePlayer> connectedPlayers;
    private final LocalDateTime timeStarted;
    private int currentPlayerIndex;
    private final GameMap gameMap;

    private final Map<Coordinates, List<PlayerPossession>> mapCoverage;

    public GameInstance(Long gameId, List<? extends Player> expectedPlayers) {
        this.gameId = gameId;
        this.currentPlayerIndex = 0;
        this.connectedPlayers = new ArrayList<>();
        this.timeStarted = LocalDateTime.now();
        this.gameMap = new GameMap("map1.txt");
        this.expectedPlayers = expectedPlayers.stream()
                .collect(Collectors.toMap(
                        Player::getId,
                        Function.identity()
                ));
        this.mapCoverage = new HashMap<>();
    }

    public GameMap getGameMap() {
        return gameMap;
    }

    public <T extends PlayerPossession> Optional<T> getPossessionAtCoordinates(Coordinates coordinates,
                                                                               String id,
                                                                               Class<T> type) {
        return getPossessionsAtCoordinates(coordinates)
                .stream()
                .filter(playerPossession -> Objects.equals(playerPossession.getId(), id))
                .filter(playerPossession -> playerPossession.getClass() == type)
                .map(type::cast)
                .findFirst();
    }

    public List<PlayerPossession> getAllPossessionsAtCoordinates(Coordinates coordinates) {
        return getPossessionsAtCoordinates(coordinates);
    }

    public void movePossession(String unitId, Coordinates sourceCoordinates, Coordinates targetCoordinates) {
        removeAndReturn(sourceCoordinates, u -> u.getId().equals(unitId))
                .ifPresentOrElse(
                        unit -> getPossessionsAtCoordinates(targetCoordinates).add(unit),
                        () -> log.error("Unit with id: {} was not found at coordinates: {}", unitId, sourceCoordinates));
    }

    private Optional<PlayerPossession> removeAndReturn(Coordinates coordinates, Predicate<PlayerPossession> predicate) {
        final Iterator<PlayerPossession> iterator = getPossessionsAtCoordinates(coordinates).iterator();
        while (iterator.hasNext()) {
            final var next = iterator.next();
            if (predicate.test(next)) {
                iterator.remove();
                return Optional.of(next);
            }
        }

        return Optional.empty();
    }


    public void connect(Long playerId) {
        synchronized (this) {
            if (expectedPlayers.remove(playerId) != null) {
                connectedPlayers.add(new GamePlayer(playerId));
            }

            if (isAllReady()) {
                Collections.shuffle(this.connectedPlayers);
            }
        }
    }

    public void disconnect(Long playerId) {
        synchronized (this) {
            if (Objects.equals(connectedPlayers.get(currentPlayerIndex).playerId, playerId)) {
                nextPlayerTurn();
            }
            connectedPlayers.removeIf(p -> Objects.equals(p.playerId(), playerId));
        }
    }

    public boolean isAllReady() {
        return this.expectedPlayers.isEmpty();
    }

    public PlayerTurnResponse executeTurn(PlayerTurn playerTurn) {
        GamePlayer player = connectedPlayers.get(currentPlayerIndex);
        // TODO: Evaluate player turn and modify game state
        nextPlayerTurn();
        return PlayerTurnResponse.accepted();
    }

    private List<PlayerPossession> getPossessionsAtCoordinates(Coordinates coordinates) {
        return mapCoverage.getOrDefault(coordinates, new ArrayList<>());
    }

    private void nextPlayerTurn() {
        currentPlayerIndex = (currentPlayerIndex + 1) % connectedPlayers.size();
    }

    private record GamePlayer(Long playerId) {}
}
