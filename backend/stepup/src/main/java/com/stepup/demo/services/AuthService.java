package com.stepup.demo.services;

import com.stepup.demo.models.dtos.AuthResponseDTO;
import com.stepup.demo.models.dtos.LoginRequestDTO;
import com.stepup.demo.models.dtos.RegisterRequestDTO;
import com.stepup.demo.models.dtos.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequestDTO request);
    AuthResponseDTO login(LoginRequestDTO request);
}

