package com.stefan.gameservice.models.api;

import com.stefan.gameservice.models.game.GameEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Mapper
public interface GameMapper {

    GameMapper instance = Mappers.getMapper(GameMapper.class);

    @Mapping(source = "game.gameState", target = "gameState")
    @Mapping(source = "game.id", target = "id")
    GameImpl toGameDto(GameEntity game, List<PlayerImpl> players);

}
