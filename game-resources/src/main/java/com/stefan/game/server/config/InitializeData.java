package com.stefan.game.server.config;

import com.stefan.game.server.model.building.BuildingEntity;
import com.stefan.game.server.model.resource.ResourceEntity;
import com.stefan.game.server.model.terrain.TerrainEntity;
import com.stefan.game.server.model.unit.UnitEntity;
import com.stefan.game.server.repository.BuildingRepository;
import com.stefan.game.server.repository.ResourceRepository;
import com.stefan.game.server.repository.TerrainRepository;
import com.stefan.game.server.repository.UnitRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Flux;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Configuration
public class InitializeData {

    @Bean
    public ApplicationListener<ApplicationReadyEvent> applicationReadyListener(
            TerrainRepository terrainRepository,
            BuildingRepository buildingRepository,
            UnitRepository unitRepository,
            ResourceRepository resourceRepository) {
        return event -> {
            resourceRepository.count()
                    .subscribe(count -> {
                        if (count == 0) {
                            Flux.just("Gold", "Wood", "Iron")
                                    .flatMap(name -> resourceRepository.save(new ResourceEntity(name, "asset")))
                                    .collectList()
                                    .subscribe(insertedResources -> Flux.zip(saveTerrain(terrainRepository),
                                                    saveBuildings(buildingRepository),
                                                    saveUnit(unitRepository))
                                            .flatMap(tuple3 -> Flux.zip(
                                                    resourceRepository.addCostForBuilding(tuple3.getT2().id(), insertedResources.get(1).getId(), 10L),
                                                    resourceRepository.addCostForUnit(tuple3.getT3().id(), insertedResources.get(2).getId(), 20L),
                                                    resourceRepository.addCostForBuilding(tuple3.getT2().id(), insertedResources.get(0).getId(), 45L))
                                            )
                                            .subscribe());
                        }
                    });
        };
    }

    private Flux<UnitEntity> saveUnit(UnitRepository unitRepository) {
        return unitRepository.saveAll(List.of(new UnitEntity(null, "Marine", "asset")));
    }

    private Flux<BuildingEntity> saveBuildings(BuildingRepository buildingRepository) {
        var b1 = new BuildingEntity(null, "House", "asset");
        var b2 = new BuildingEntity(null, "Castle", "asset");
        return buildingRepository.saveAll(List.of(b1, b2));
    }

    Flux<TerrainEntity> saveTerrain(TerrainRepository terrainRepository) {
        var t1 = new TerrainEntity(null, 1, "t1", "asset1");
        var t2 = new TerrainEntity(null, 2, "t2", "asset2");
        var t3 = new TerrainEntity(null, 3, "t3", "asset3");
        return terrainRepository.saveAll(List.of(t1, t2, t3));
    }


}
