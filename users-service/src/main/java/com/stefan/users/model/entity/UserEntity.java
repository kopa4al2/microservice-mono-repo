package com.stefan.users.model.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author Stefan Ivanov
 * @since 12.11.2022
 */
@Table("users")
public record UserEntity(@Id Long id,
                         String email,
                         String username,
                         String password,
                         @Column("user_details_id") Long userDetailId) {
}
