package com.stepup.demo.models.dtos;

import com.stepup.demo.models.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    private Long id;
    @NotBlank
    @Size(min = 1, max = 100)
    private String firstName;
    @NotBlank
    @Size(min = 1, max = 100)
    private String lastName;
    @NotBlank
    @Size(min = 1, max = 255)
    private String address;
    @NotBlank
    @Size(min = 1, max = 100)
    private String city;
    @NotBlank
    @Size(min = 1, max = 5)
    private String postalCode;
    @NotBlank
    @Size(min = 1, max = 16)
    private String phoneNumber;
}
