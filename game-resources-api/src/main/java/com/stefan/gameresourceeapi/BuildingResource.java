package com.stefan.gameresourceeapi;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@NoArgsConstructor
@Getter
@Setter
public class BuildingResource extends AbstractGameResource {

    private Map<String, Long> cost;

    public BuildingResource(Long id, String name, String asset, Map<String, Long> cost) {
        super(id, name, asset);
        this.cost = cost;
    }

}
