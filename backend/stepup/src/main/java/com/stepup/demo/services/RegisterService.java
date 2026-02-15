package com.stepup.demo.services;

import com.stepup.demo.models.dtos.RegisterRequestDTO;
import com.stepup.demo.models.dtos.RegisterResponse;

public interface RegisterService {
    RegisterResponse register(RegisterRequestDTO request);
}

