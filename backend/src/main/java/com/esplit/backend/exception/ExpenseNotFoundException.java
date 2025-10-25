package com.esplit.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ExpenseNotFoundException extends ResponseStatusException {
    public ExpenseNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
