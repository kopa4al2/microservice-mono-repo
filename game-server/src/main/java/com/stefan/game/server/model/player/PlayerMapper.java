package com.stefan.game.server.model.player;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Mapper
public interface PlayerMapper {

    PlayerMapper INSTANCE = Mappers.getMapper(PlayerMapper.class);

    PlayerDto toDto(PlayerEntity entity);
}
