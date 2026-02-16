package com.stepup.demo.controllers;

import com.stepup.demo.models.dtos.AuthResponseDTO;
import com.stepup.demo.models.dtos.LoginRequestDTO;
import com.stepup.demo.models.dtos.RegisterRequestDTO;
import com.stepup.demo.models.dtos.RegisterResponse;
import com.stepup.demo.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> searchProducts(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        RegisterResponse response = authService.register(registerRequestDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request
    ) {

        return ResponseEntity.ok(authService.login(request));
    }
}
