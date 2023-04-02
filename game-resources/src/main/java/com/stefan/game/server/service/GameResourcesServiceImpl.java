package com.stefan.game.server.service;

import com.stefan.game.server.model.building.BuildingMapper;
import com.stefan.game.server.model.resource.ResourceEntity;
import com.stefan.game.server.model.resource.ResourceMapper;
import com.stefan.game.server.model.terrain.TerrainMapper;
import com.stefan.game.server.model.unit.UnitMapper;
import com.stefan.game.server.repository.BuildingRepository;
import com.stefan.game.server.repository.ResourceRepository;
import com.stefan.game.server.repository.TerrainRepository;
import com.stefan.game.server.repository.UnitRepository;
import com.stefan.gameresourceeapi.BuildingResource;
import com.stefan.gameresourceeapi.ConsumableResource;
import com.stefan.gameresourceeapi.TerrainResource;
import com.stefan.gameresourceeapi.UnitResource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.stream.Collectors;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Service
@RequiredArgsConstructor
public class GameResourcesServiceImpl implements GameResourcesService {

    private final TerrainRepository terrainRepository;
    private final BuildingRepository buildingRepository;
    private final UnitRepository unitRepository;
    private final ResourceRepository resourceRepository;

    @Override
    public Flux<TerrainResource> getTerrainResources() {
        return terrainRepository.findAll().map(TerrainMapper.instance::toDto);
    }

    @Override
    public Flux<BuildingResource> getBuildingResource() {
        return buildingRepository.findAll()
                .flatMap(building -> resourceRepository.findCostForBuilding(building.id())
                        .collectList()
                        .map(cost -> BuildingMapper.instance.toDto(
                                building, cost
                                        .stream()
                                        .collect(Collectors.toMap(
                                                res -> ResourceMapper.instance.toDto(res).getName(),
                                                ResourceEntity::getAmount)))));
    }

    @Override
    public Flux<UnitResource> getUnitResources() {
        return unitRepository.findAll()
                .flatMap(unit -> resourceRepository.findCostForUnit(unit.id())
                        .collectList()
                        .map(cost -> UnitMapper.instance.toDto(
                                unit, cost
                                        .stream()
                                        .collect(Collectors.toMap(
                                                res -> ResourceMapper.instance.toDto(res).getName(),
                                                ResourceEntity::getAmount)))));
    }

    @Override
    public Flux<ConsumableResource> getConsumableResources() {
        return resourceRepository.findAll().map(ResourceMapper.instance::toDto);
    }
}
