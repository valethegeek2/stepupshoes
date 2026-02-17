package com.stepup.demo.models.dtos;

import lombok.Data;

@Data
public class AddToCartRequestDTO {
    private Long variantId;
    private int quantity;
}
