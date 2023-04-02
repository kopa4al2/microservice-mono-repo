package com.stefan.game.server.repository;

import com.stefan.game.server.model.unit.UnitEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Repository
public interface UnitRepository extends ReactiveCrudRepository<UnitEntity, Long> {
}
