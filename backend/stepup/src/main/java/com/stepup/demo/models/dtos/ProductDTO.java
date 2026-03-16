package com.stepup.demo.models.dtos;

import com.stepup.demo.models.Category;
import com.stepup.demo.models.Gender;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String brand;
    private String productImage;
    @Size(max=255)
    private String tags;
    private float basePrice;
    private Long reviews;
    private Long rating;
    private Gender gender;
    private Category category;
    private Integer numberOfVariants;
    private Boolean isActive;
}
