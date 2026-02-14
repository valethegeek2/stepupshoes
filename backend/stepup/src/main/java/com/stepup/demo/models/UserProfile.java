package com.stepup.demo.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "user_profile")
@Data
@NoArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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



/**
 * CREATE TABLE user_profiles (
 *     birthdate DATE,
 *     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
 *     -- ON DELETE CASCADE: If the underlying user is deleted, delete their user profile as well
 * );
 */
}
