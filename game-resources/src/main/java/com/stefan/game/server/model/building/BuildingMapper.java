package com.stefan.game.server.model.building;

import com.stefan.gameresourceeapi.BuildingResource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Map;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Mapper
public interface BuildingMapper {

    BuildingMapper instance = Mappers.getMapper(BuildingMapper.class);

    @Mapping(source = "building.id", target = "id")
    @Mapping(source = "building.name", target = "name")
    @Mapping(source = "building.asset", target = "asset")
    @Mapping(source = "cost", target = "cost")
    BuildingResource toDto(BuildingEntity building, Map<String, Long> cost);
}
