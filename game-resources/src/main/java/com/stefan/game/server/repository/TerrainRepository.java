package com.stefan.game.server.repository;

import com.stefan.game.server.model.terrain.TerrainEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Repository
public interface TerrainRepository extends ReactiveCrudRepository<TerrainEntity, Long> {
}
