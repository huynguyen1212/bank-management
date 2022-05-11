package com.ptit.backend.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ApiResponse.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseObject handleAllException(Exception ex, WebRequest request) {
        return ResponseObject.builder().status(HttpStatus.NOT_IMPLEMENTED).message(ex.getMessage()).build();
    }
}
