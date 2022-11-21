package com.stefan.gameservice.models.api;

import com.stefan.gameservice.models.player.PlayerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Mapper
public interface PlayerMapper {

    PlayerMapper instance = Mappers.getMapper(PlayerMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "nickname", target = "nickname")
    PlayerImpl toPlayerDto(PlayerEntity player);

    @Mapping(source = "player.id", target = "id")
    @Mapping(source = "player.nickname", target = "nickname")
    @Mapping(source = "userId", target = "userId")
    PlayerImpl toPlayerDto(PlayerEntity player, Long userId);

}
