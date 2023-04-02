package com.stefan.base.api;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public record MicroserviceResponseBody<T>(MicroserviceResponseStatus status, T payload) {

    public static MicroserviceResponseBody<Void> failed(String reason) {
        return new MicroserviceResponseBody<>(MicroserviceResponseStatus.failed(reason), null);
    }

    public static <T> MicroserviceResponseBody<T> success(T body) {
        return new MicroserviceResponseBody<>(MicroserviceResponseStatus.success(), body);
    }

    public static <T> MicroserviceResponseBody<T> success(T body, String message) {
        return new MicroserviceResponseBody<>(MicroserviceResponseStatus.success(message), body);
    }

}
