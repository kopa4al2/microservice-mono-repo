package com.stefan.userservice.api;

import com.stefan.gameserviceapi.Player;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public interface UserWithPlayers extends User {
    List<Player> getPlayers();
}
