package com.stefan.users.model.api;

import com.stefan.userservice.api.UserMetaData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMetaImpl implements UserMetaData {

    private String description;
    private String address;

}
