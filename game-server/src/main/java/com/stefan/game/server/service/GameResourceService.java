package com.stefan.game.server.service;

import com.stefan.gameresourceeapi.BuildingResource;
import com.stefan.gameresourceeapi.TerrainResource;
import com.stefan.gameresourceeapi.UnitResource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Service
@RequiredArgsConstructor
public class GameResourceService implements InitializingBean {

    private final WebClient.Builder webClient;

    private Map<Long, TerrainResource> terrainResources;

    private Map<Long, BuildingResource> buildingResources;

    private Map<Long, UnitResource> unitResources;

    @Override
    public void afterPropertiesSet() {
        Flux.zip(
                loadTerrains().collectList(),
                loadBuildings().collectList(),
                loadUnits().collectList()
        ).subscribe(tuple3 -> {
            terrainResources = tuple3.getT1().stream()
                    .collect(Collectors.toMap(
                            TerrainResource::getId,
                            Function.identity()));
            buildingResources = tuple3.getT2().stream()
                    .collect(Collectors.toMap(
                            BuildingResource::getId,
                            Function.identity()));
            unitResources = tuple3.getT3().stream()
                    .collect(Collectors.toMap(
                            UnitResource::getId,
                            Function.identity()));
        });
    }

    public Map<Long, TerrainResource> getTerrainResources() {
        return terrainResources;
    }

    public Map<Long, BuildingResource> getBuildingResources() {
        return buildingResources;
    }

    public Map<Long, UnitResource> getUnitResources() {
        return unitResources;
    }

    private Flux<TerrainResource> loadTerrains() {
        return webClient.build()
                .get()
                .uri("http://game-resources/terrains")
                .retrieve()
                .bodyToFlux(TerrainResource.class);
    }

    private Flux<BuildingResource> loadBuildings() {
        return webClient.build()
                .get()
                .uri("http://game-resources/buildings")
                .retrieve()
                .bodyToFlux(BuildingResource.class);
    }

    private Flux<UnitResource> loadUnits() {
        return webClient.build()
                .get()
                .uri("http://game-resources/units")
                .retrieve()
                .bodyToFlux(UnitResource.class);
    }
}
