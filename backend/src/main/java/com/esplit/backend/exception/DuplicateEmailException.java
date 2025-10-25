package com.esplit.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DuplicateEmailException extends ResponseStatusException {
    public DuplicateEmailException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
