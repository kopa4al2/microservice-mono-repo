package com.stefan.users.model.api;

import com.stefan.gameserviceapi.Player;
import com.stefan.userservice.api.User;
import com.stefan.userservice.api.UserMetaData;
import com.stefan.userservice.api.UserWithPlayers;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserImpl implements User, UserWithPlayers {

    private Long id;
    private String username;
    private String email;
    private List<Long> playersIds;
    private UserMetaData userDetails;
    private List<Player> players;

}
