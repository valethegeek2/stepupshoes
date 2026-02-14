package com.stepup.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * @brief Represents the user entity
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Size(min = 1, max = 100)
    private String username;


    @Size(min = 1, max = 100)
    private String password;

    @Size(min = 1, max = 100)
    @Column(unique = true)
    private String email;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    private Instant createdAt;

}
