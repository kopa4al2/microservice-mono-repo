package com.stefan.commons;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public class StatusCodeException extends RuntimeException {

    int statusCode;

    public StatusCodeException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public StatusCodeException(String message, Throwable cause, int statusCode) {
        super(message, cause);
        this.statusCode = statusCode;
    }

    public StatusCodeException(Throwable cause, int statusCode) {
        super(cause);
        this.statusCode = statusCode;
    }

    public StatusCodeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, int statusCode) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.statusCode = statusCode;
    }
}
