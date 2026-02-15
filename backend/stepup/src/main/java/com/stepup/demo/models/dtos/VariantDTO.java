package com.stepup.demo.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VariantDTO {
    private Long variantId;
    private String color;
    private String size;
    private Integer stock;
    private float finalPrice;
    private boolean is_available;
}
