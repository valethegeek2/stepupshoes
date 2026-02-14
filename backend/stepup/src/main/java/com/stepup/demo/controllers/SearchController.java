package com.stepup.demo.controllers;

import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public class SearchController {
    @GetMapping("/search")
    public ResponseEntity<List<ProductSearchResponseDTO>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) String gender
    ) {
        return ResponseEntity.ok(
                productService.searchProducts(name, category, size, gender)
        );
    }

}
