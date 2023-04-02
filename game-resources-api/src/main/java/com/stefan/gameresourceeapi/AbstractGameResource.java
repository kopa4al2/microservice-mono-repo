package com.stefan.gameresourceeapi;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class AbstractGameResource {

    private Long id;
    private String name;
    private String asset;

}
