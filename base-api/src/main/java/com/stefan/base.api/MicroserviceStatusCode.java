package com.stefan.base.api;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public enum MicroserviceStatusCode {
    FAILED(0), SUCCESS(1);

    private final int statusCode;
    MicroserviceStatusCode(int i) {
        this.statusCode = i;
    }
}
