package com.stefan.game.server.repository;

import com.stefan.game.server.model.resource.ResourceEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Repository
public interface ResourceRepository extends ReactiveCrudRepository<ResourceEntity, Long> {

    @Query("SELECT r.*, c.amount as amount FROM resource r " +
            "JOIN unit_cost c ON c.resource_id = r.id " +
            "JOIN unit u ON u.id = c.unit_id " +
            "WHERE u.id = :unitId")
    Flux<ResourceEntity> findCostForUnit(Long unitId);

    @Query("SELECT r.*, c.amount as amount FROM resource r " +
            "JOIN building_cost c ON c.resource_id = r.id " +
            "JOIN building u ON u.id = c.building_id " +
            "WHERE u.id = :buildingId")
    Flux<ResourceEntity> findCostForBuilding(Long buildingId);

    @Query("INSERT INTO unit_cost (unit_id, resource_id, amount) VALUES(:unitId, :resourceId, :amount)")
    Mono<Void> addCostForUnit(Long unitId, Long resourceId, Long amount);

    @Query("INSERT INTO building_cost (building_id, resource_id, amount) VALUES(:buildingId, :resourceId, :amount)")
    Mono<Void> addCostForBuilding(Long buildingId, Long resourceId, Long amount);
}
