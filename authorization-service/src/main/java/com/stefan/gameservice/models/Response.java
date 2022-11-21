package com.stefan.gameservice.models;

import lombok.RequiredArgsConstructor;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@RequiredArgsConstructor
public class Response<T> {

    private final String status;
    private final String statusMessage;
    private final T data;
}
