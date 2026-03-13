package com.stepup.demo.models.dtos;

import com.stepup.demo.models.Role;
import com.stepup.demo.models.UserProfile;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    @Size(min = 1, max = 100)
    private String username;
    @Size(min = 1, max = 100)
    private String password;
    @Size(min = 1, max = 100)
    private String email;
    @NotNull
    private Role role;
    private Instant createdAt;
}
