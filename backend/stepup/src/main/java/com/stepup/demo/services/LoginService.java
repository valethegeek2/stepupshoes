package com.stepup.demo.services;

import com.stepup.demo.models.dtos.AuthResponseDTO;
import com.stepup.demo.models.dtos.LoginRequestDTO;

public interface LoginService {
    AuthResponseDTO login(LoginRequestDTO request);
}
