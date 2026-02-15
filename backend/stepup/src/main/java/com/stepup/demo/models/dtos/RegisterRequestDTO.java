package com.stepup.demo.models.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequestDTO {

    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // profile fields
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @NotBlank private String address;
    @NotBlank private String city;
    @NotBlank private String postalCode;
    @NotBlank private String phoneNumber;
}
