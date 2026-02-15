package com.stepup.demo.controllers;

import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import com.stepup.demo.models.dtos.RegisterRequestDTO;
import com.stepup.demo.models.dtos.RegisterResponse;
import com.stepup.demo.services.RegisterService;
import com.stepup.demo.services.SearchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class RegisterController {
    @Autowired
    RegisterService registerService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> searchProducts(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        RegisterResponse response = registerService.register(registerRequestDTO);
        return ResponseEntity.ok(response);
    }

}