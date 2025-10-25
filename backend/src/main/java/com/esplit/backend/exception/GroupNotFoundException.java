package com.esplit.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class GroupNotFoundException extends ResponseStatusException {
    public GroupNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
