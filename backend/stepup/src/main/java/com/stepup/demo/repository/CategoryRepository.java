package com.stepup.demo.repository;

import com.stepup.demo.models.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(@NotBlank @Size(min = 1, max = 100) String name);
}
