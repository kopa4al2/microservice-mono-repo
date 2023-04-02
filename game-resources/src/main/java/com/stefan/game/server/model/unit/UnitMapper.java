package com.stefan.game.server.model.unit;

import com.stefan.gameresourceeapi.ConsumableResource;
import com.stefan.gameresourceeapi.UnitResource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Map;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Mapper
public interface UnitMapper {

    UnitMapper instance = Mappers.getMapper(UnitMapper.class);

    @Mapping(source = "unit.id", target = "id")
    @Mapping(source = "unit.name", target = "name")
    @Mapping(source = "unit.asset", target = "asset")
    @Mapping(source = "cost", target = "cost")
    UnitResource toDto(UnitEntity unit, Map<String, Long> cost);
}
