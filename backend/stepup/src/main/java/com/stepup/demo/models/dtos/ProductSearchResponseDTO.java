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

    private Long id;
    private String name;
    private String description;
    private String tags;
    private float basePrice;
    private String gender;
    private String category;
    private List<VariantDTO> variants;

    private ProductSearchResponseDTO mapToDto(Product p) {

        List<VariantDTO> variants = p.getVariants()
                .stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsAvailable()))
                .map(v -> VariantDTO.builder()
                        .id(v.getId())
                        .color(v.getColor())
                        .size(v.getSize())
                        .stock(v.getStock())
                        .priceAdjustment(v.getPriceAdjustment())
                        .build())
                .toList();

        return ProductSearchResponseDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .basePrice(p.getBasePrice())
                .gender(p.getGender().name())
                .category(p.getCategory().getName())
                .tags(p.getTags())
                .variants(variants)
                .build();
    }


}

