package com.stefan.game.server.model.terrain;

import com.stefan.gameresourceeapi.TerrainResource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Mapper
public interface TerrainMapper {

    TerrainMapper instance = Mappers.getMapper(TerrainMapper.class);

    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.name", target = "name")
    @Mapping(source = "entity.mapIndex", target = "mapIndex")
    @Mapping(source = "entity.asset", target = "asset")
    TerrainResource toDto(TerrainEntity entity);

}
