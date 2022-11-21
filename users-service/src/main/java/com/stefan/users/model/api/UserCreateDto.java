package com.stefan.users.model.api;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public record UserCreateDto(String username, String email, String rawPassword) {
}
