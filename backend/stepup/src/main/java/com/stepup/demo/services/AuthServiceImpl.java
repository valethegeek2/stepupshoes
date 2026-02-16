package com.stepup.demo.services;

import com.stepup.demo.models.Role;
import com.stepup.demo.models.User;
import com.stepup.demo.models.UserProfile;
import com.stepup.demo.models.dtos.AuthResponseDTO;
import com.stepup.demo.models.dtos.LoginRequestDTO;
import com.stepup.demo.models.dtos.RegisterRequestDTO;
import com.stepup.demo.models.dtos.RegisterResponse;
import com.stepup.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequestDTO request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.customer);
        user.setCreatedAt(Instant.now());

        UserProfile profile = new UserProfile();
        profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setAddress(request.getAddress());
        profile.setCity(request.getCity());
        profile.setPostalCode(request.getPostalCode());
        profile.setPhoneNumber(request.getPhoneNumber());

        profile.setUser(user);
        user.setProfile(profile);

        User saved = userRepository.save(user);

        return new RegisterResponse(
                saved.getUsername()
        );
    }

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = jwtService.generateToken(request.getUsername());

        return new AuthResponseDTO(token);
    }

}
