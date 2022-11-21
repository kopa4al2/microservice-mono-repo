package com.stefan.users.model.api;

import com.stefan.gameserviceapi.Player;
import com.stefan.users.model.entity.UserDetailEntity;
import com.stefan.users.model.entity.UserEntity;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public interface UserMapper {

    UserMapper instance = Mappers.getMapper(UserMapper.class);

    UserEntity toEntity(UserCreateDto createDto);

    UserImpl toDto(UserEntity user, UserDetailEntity details);

    UserImpl toDto(UserEntity user, UserDetailEntity details, List<Player> player);
}
