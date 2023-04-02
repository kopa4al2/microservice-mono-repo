package com.stefan.game.server.model.api;

import com.stefan.gameserviceapi.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDtoImpl implements Player {

    private Long id;
    private String nickname;
    private Long userId;

}
