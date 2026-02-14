package com.stepup.demo.models.dtos;

import com.stepup.demo.models.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSearchResponseDTO {

    private Long productId;
    private String name;
    private String description;
    private float basePrice;
    private String gender;
    private String category;
    private List<VariantDTO> variants;

    private ProductSearchResponseDTO mapToDto(Product p) {

        List<VariantDTO> variants = p.getVariants()
                .stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsAvailable()))
                .map(v -> VariantDTO.builder()
                        .variantId(v.getVariantId())
                        .color(v.getColor())
                        .size(v.getSize())
                        .stock(v.getStock())
                        .finalPrice(p.getBasePrice() + v.getPriceAdjustment())
                        .build())
                .toList();

        return ProductSearchResponseDTO.builder()
                .productId(p.getProductId())
                .name(p.getName())
                .description(p.getDescription())
                .basePrice(p.getBasePrice())
                .gender(p.getGender().name())
                .category(p.getCategory().getName())
                .variants(variants)
                .build();
    }


}

