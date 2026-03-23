package com.stepup.demo.controllers;

import com.stepup.demo.AppConstants;
import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.dtos.*;
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
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<PagedResponse<ProductDTO, Long>> getAllProducts(
            @RequestParam(name="pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name="pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name="sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(name="sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        PagedResponse<Product, Long> productsResponse = productService.getAllProducts(
                pageNumber, pageSize, sortBy, sortOrder
        );
        PagedResponse<ProductDTO, Long> response = new PagedResponse<>();
        response.setContents(productsResponse.getContents()
                .stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .toList());
        response.setPageNumber(productsResponse.getPageNumber());
        response.setPageSize(productsResponse.getPageSize());
        response.setTotalElements(productsResponse.getTotalElements());
        response.setTotalPages(productsResponse.getTotalPages());
        response.setLastPage(productsResponse.isLastPage());
        return new  ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<PagedResponse<ProductDTO, Long>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) String gender,
            @RequestParam(name="pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name="pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name="sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(name="sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        PagedResponse<Product, Long> productsResponse = productService.searchProducts(
                name, tags, category, size, gender,
                pageNumber, pageSize, sortBy, sortOrder
        );
        PagedResponse<ProductDTO, Long> response = new PagedResponse<>();
        response.setContents(productsResponse.getContents()
                .stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .toList());
        response.setPageNumber(productsResponse.getPageNumber());
        response.setPageSize(productsResponse.getPageSize());
        response.setTotalElements(productsResponse.getTotalElements());
        response.setTotalPages(productsResponse.getTotalPages());
        response.setLastPage(productsResponse.isLastPage());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/{productId}/productVariants")
    public ResponseEntity<List<VariantDTO>> getAllProductVariantsByProductId(@PathVariable long productId) {
        List<ProductVariant> variants = productService.getAllProductVariantsByProductId(productId);
        List<VariantDTO> variantDTOS = variants.stream()
                .map(variant -> modelMapper.map(variant, VariantDTO.class))
                .toList();

        return new ResponseEntity<>(variantDTOS, HttpStatus.OK);
    }



}