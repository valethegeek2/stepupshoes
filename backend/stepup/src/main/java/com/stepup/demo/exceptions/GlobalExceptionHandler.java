package com.stepup.demo.exceptions;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ─────────────────────────────────────────────
    //  404 — Entity not found
    //  Thrown by: CartServiceImpl, OrderServiceImpl,
    //             ProductServiceImpl, UserServiceImpl
    // ─────────────────────────────────────────────

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleEntityNotFound(EntityNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // ─────────────────────────────────────────────
    //  409 — Duplicate username or email on register
    //  Thrown by: AuthServiceImpl
    // ─────────────────────────────────────────────

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    // ─────────────────────────────────────────────
    //  401 — Bad credentials on login
    //  Thrown by: Spring Security / AuthServiceImpl
    // ─────────────────────────────────────────────

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUsernameNotFound(UsernameNotFoundException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid username or password");
    }

    // ─────────────────────────────────────────────
    //  400 — Bad request (invalid argument)
    //  Thrown by: CartServiceImpl (quantity/stock checks)
    //             OrderServiceImpl (invalid status)
    // ─────────────────────────────────────────────

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // ─────────────────────────────────────────────
    //  409 — Conflict / invalid state
    //  Thrown by: CartServiceImpl (variant unavailable)
    //             OrderServiceImpl (empty cart, out of stock)
    // ─────────────────────────────────────────────

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalState(IllegalStateException ex) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    // ─────────────────────────────────────────────
    //  403 — Access denied
    //  Thrown by: OrderServiceImpl (user accessing another user's order)
    // ─────────────────────────────────────────────

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<Map<String, Object>> handleSecurityException(SecurityException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    // ─────────────────────────────────────────────
    //  400 — Validation failures (@Valid on DTOs)
    //  Thrown by: Spring when @NotBlank / @NotNull / @Email fail
    //  Covers: RegisterRequestDTO, LoginRequestDTO,
    //          PlaceOrderRequestDTO and all other validated DTOs
    // ─────────────────────────────────────────────

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .reduce("", (a, b) -> a.isEmpty() ? b : a + ", " + b);
        return buildResponse(HttpStatus.BAD_REQUEST, message);
    }

    // ─────────────────────────────────────────────
    //  500 — Catch-all for unexpected exceptions
    // ─────────────────────────────────────────────

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred");
    }

    // ─────────────────────────────────────────────
    //  HELPER — builds a consistent error response body
    // ─────────────────────────────────────────────

    private ResponseEntity<Map<String, Object>> buildResponse(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", Instant.now().toString());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        return new ResponseEntity<>(body, status);
    }
}
