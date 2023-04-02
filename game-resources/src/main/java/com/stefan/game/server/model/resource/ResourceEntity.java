package com.stefan.game.server.model.resource;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("resource")
public class ResourceEntity {
    @Id
    private Long id;
    private String name;
    private String asset;
    @ReadOnlyProperty
    private Long amount;

    public ResourceEntity(String name, String asset) {
        this.name = name;
        this.asset = asset;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAsset() {
        return asset;
    }
}
