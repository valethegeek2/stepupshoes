package com.stepup.demo.models.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemResponseDTO {

    private Long variantId;
    private String productName;
    private String color;
    private String size;
    private float price;
    private int quantity;
    private float subtotal;
}
