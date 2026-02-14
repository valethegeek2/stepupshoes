package com.stepup.demo.controllers;

import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import com.stepup.demo.services.SearchService;
import com.stepup.demo.services.SearchServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class SearchController {
    @Autowired
    SearchService productService;

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
