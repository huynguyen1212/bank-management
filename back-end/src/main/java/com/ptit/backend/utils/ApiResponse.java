package com.ptit.backend.utils;

import lombok.*;
import org.springframework.http.HttpStatus;

@Builder
@Getter
@Setter
public class ApiResponse extends RuntimeException {
    private HttpStatus status;
    private String message;
}
