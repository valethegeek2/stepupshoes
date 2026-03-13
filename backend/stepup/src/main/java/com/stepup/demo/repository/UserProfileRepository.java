package com.stepup.demo.repository;

import com.stepup.demo.models.User;
import com.stepup.demo.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(User userFromDB);
}
