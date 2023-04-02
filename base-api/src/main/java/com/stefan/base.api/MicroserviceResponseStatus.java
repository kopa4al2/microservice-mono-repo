package com.stefan.base.api;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public record MicroserviceResponseStatus(MicroserviceStatusCode statusCode, String statusMessage) {

    public static MicroserviceResponseStatus success() {
        return new MicroserviceResponseStatus(MicroserviceStatusCode.SUCCESS, "Success");
    }

    public static MicroserviceResponseStatus success(String statusMessage) {
        return new MicroserviceResponseStatus(MicroserviceStatusCode.SUCCESS, statusMessage);
    }

    public static MicroserviceResponseStatus failed(String statusMessage) {
        return new MicroserviceResponseStatus(MicroserviceStatusCode.FAILED, statusMessage);
    }

}
