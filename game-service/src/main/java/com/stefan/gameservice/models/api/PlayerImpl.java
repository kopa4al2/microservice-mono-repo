package com.stefan.gameservice.models.api;

import com.stefan.gameserviceapi.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerImpl implements Player {

    private Long id;
    private String nickname;
    private Long userId;

}
