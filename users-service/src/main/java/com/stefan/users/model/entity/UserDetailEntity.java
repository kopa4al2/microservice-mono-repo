package com.stefan.users.model.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Table("user_details")
public record UserDetailEntity(@Id Long id,
                               String address,
                               String description) {
}
