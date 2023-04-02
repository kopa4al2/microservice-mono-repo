package com.stefan.game.server.model.resource;

import com.stefan.gameresourceeapi.ConsumableResource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Mapper
public interface ResourceMapper {

    ResourceMapper instance = Mappers.getMapper(ResourceMapper.class);

    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.name", target = "name")
    @Mapping(source = "entity.asset", target = "asset")
    ConsumableResource toDto(ResourceEntity entity);

}
