package com.stefan.base.api;

/**
 * @author Stefan Ivanov
 * @since 20.11.2022
 */
public record MicroserviceRequestBody<T>(T payload){}
