package com.stefan.gameservice.exception;

import lombok.Getter;

/**
 * @author Stefan Ivanov
 * @since 14.11.2022
 */
@Getter
public class GameServiceException extends RuntimeException {

    private final int statusCode;

    public GameServiceException(String message, int statusCode, Throwable cause) {
        super(message, cause);
        this.statusCode = statusCode;
    }

    public GameServiceException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

}
