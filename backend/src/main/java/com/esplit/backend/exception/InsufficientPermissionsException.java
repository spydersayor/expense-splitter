package com.esplit.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InsufficientPermissionsException extends ResponseStatusException {
    public InsufficientPermissionsException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}
