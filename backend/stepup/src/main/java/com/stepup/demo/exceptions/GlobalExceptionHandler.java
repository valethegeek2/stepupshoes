package com.stepup.demo.exceptions;

import com.stepup.demo.models.dtos.APIResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.stepup.demo.exceptions.APIException;

import java.util.HashMap;
import java.util.Map;

// Tells Spring Boot to handle specific exceptions through here
// The custom message will be made, but will not be delivered as a response to the client
@RestControllerAdvice
public class GlobalExceptionHandler {

    // We can also implement Exception handler
    // that will handle anything except the exceptions listed / handled
    // in here

    /*
    When you get a Method....Exception handle it here
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> myMethodArgumentNotValidException(MethodArgumentNotValidException manve) {
        Map<String, String> response = new HashMap<>();
        manve.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            response.put(fieldName, message);
        });

        return new ResponseEntity<Map<String, String>>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<APIResponse> myEntityNotFoundException(EntityNotFoundException rnfe) {
        // Simple String was too hardcode, now with APIRepsoinse we have a better code quality
        String message = rnfe.getMessage();
        APIResponse apiResponse = new APIResponse(message, false);
        return new  ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(APIException.class)
    public ResponseEntity<APIResponse> myAPIException(APIException e) {
        String message = e.getMessage();
        APIResponse apiResponse = new APIResponse(message, false);
        return new  ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }



}
