package com.stepup.demo.controllers;

import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import com.stepup.demo.models.dtos.VariantDTO;
import com.stepup.demo.services.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductSearchResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductSearchResponseDTO> getProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductSearchResponseDTO>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) String gender
    ) {
        return ResponseEntity.ok(productService.searchProducts(name, tags, category, size, gender));
    }


    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(product));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product updatedProduct
    ) {
        try {
            return ResponseEntity.ok(productService.updateProduct(id, updatedProduct));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/{productId}/variants")
    public ResponseEntity<ProductVariant> addVariant(
            @PathVariable Long productId,
            @RequestBody ProductVariant variant
    ) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(productService.addVariant(productId, variant));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/variants/{variantId}")
    public ResponseEntity<ProductVariant> updateVariant(
            @PathVariable Long variantId,
            @RequestBody ProductVariant updatedVariant
    ) {
        try {
            return ResponseEntity.ok(productService.updateVariant(variantId, updatedVariant));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/variants/{variantId}")
    public ResponseEntity<Void> deleteVariant(@PathVariable Long variantId) {
        try {
            productService.deleteVariant(variantId);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
