package com.stepup.demo.controllers;

import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.dtos.ProductDTO;
import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import com.stepup.demo.models.dtos.VariantDTO;
import com.stepup.demo.services.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

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
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        ProductDTO response = modelMapper.map(productService.createProduct(product), ProductDTO.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDTO productDTO
    ) {
        try {
            Product updatedProduct = modelMapper.map(productDTO, Product.class);
            ProductDTO response = modelMapper.map(productService.updateProduct(id, updatedProduct), ProductDTO.class);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{productId}/variants")
    public ResponseEntity<VariantDTO> addVariant(
            @PathVariable Long productId,
            @RequestBody VariantDTO variantDTO
    ) {
        try {
            ProductVariant variant = modelMapper.map(variantDTO, ProductVariant.class);
            VariantDTO response = modelMapper.map(productService.addVariant(productId, variant), VariantDTO.class);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/variants/{variantId}")
    public ResponseEntity<VariantDTO> updateVariant(
            @PathVariable Long variantId,
            @RequestBody VariantDTO variantDTO
    ) {
        try {
            ProductVariant updatedVariant = modelMapper.map(variantDTO, ProductVariant.class);
            VariantDTO response = modelMapper.map(productService.updateVariant(variantId, updatedVariant), VariantDTO.class);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/variants/{variantId}")
    public ResponseEntity<Long> deleteVariant(@PathVariable Long variantId) {
        try {
            productService.deleteVariant(variantId);
            return new ResponseEntity<>(variantId, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}