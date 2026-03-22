package com.stepup.demo.exceptions;

/**
 * Thrown during registration when a username or email
 * is already taken by an existing account.
 */
public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
