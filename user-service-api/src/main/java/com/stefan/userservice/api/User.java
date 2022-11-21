package com.stefan.userservice.api;

import java.util.List;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public interface User {

    Long getId();

    String getUsername();

    String getEmail();

    UserMetaData getUserDetails();

    List<Long> getPlayersIds();
}
