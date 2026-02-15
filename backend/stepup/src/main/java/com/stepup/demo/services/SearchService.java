package com.stepup.demo.services;

import com.stepup.demo.models.dtos.ProductSearchResponseDTO;

import java.util.List;

public interface SearchService {
    List<ProductSearchResponseDTO> searchProducts(
            String name,
            String tags,
            String category,
            String size,
            String gender
    );
}
