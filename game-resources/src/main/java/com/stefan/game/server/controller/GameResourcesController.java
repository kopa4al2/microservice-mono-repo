package com.stefan.game.server.controller;

import com.stefan.game.server.service.GameResourcesService;
import com.stefan.gameresourceeapi.BuildingResource;
import com.stefan.gameresourceeapi.ConsumableResource;
import com.stefan.gameresourceeapi.TerrainResource;
import com.stefan.gameresourceeapi.UnitResource;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
@RestController
@RequiredArgsConstructor
public class GameResourcesController {

    private final GameResourcesService gameResourcesService;

    @GetMapping("/terrains")
    public Flux<TerrainResource> getTerrains() {
        return gameResourcesService.getTerrainResources();
    }

    @GetMapping("/buildings")
    public Flux<BuildingResource> getBuildings() {
        return gameResourcesService.getBuildingResource();
    }

    @GetMapping("/units")
    public Flux<UnitResource> getUnits() {
        return gameResourcesService.getUnitResources();
    }

    @GetMapping("/consumables")
    public Flux<ConsumableResource> getConsumables() {
        return gameResourcesService.getConsumableResources();
    }
}
