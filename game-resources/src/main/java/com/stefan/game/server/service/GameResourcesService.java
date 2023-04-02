package com.stefan.game.server.service;

import com.stefan.gameresourceeapi.BuildingResource;
import com.stefan.gameresourceeapi.ConsumableResource;
import com.stefan.gameresourceeapi.TerrainResource;
import com.stefan.gameresourceeapi.UnitResource;
import reactor.core.publisher.Flux;

/**
 * @author Stefan Ivanov
 * @since 21.11.2022
 */
public interface GameResourcesService {

    Flux<TerrainResource> getTerrainResources();

    Flux<BuildingResource> getBuildingResource();

    Flux<UnitResource> getUnitResources();

    Flux<ConsumableResource> getConsumableResources();

}
