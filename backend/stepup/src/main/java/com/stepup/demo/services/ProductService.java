package com.stepup.demo.services;

import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.dtos.ProductSearchResponseDTO;

import java.util.List;

public interface ProductService {


    List<ProductSearchResponseDTO> getAllProducts();

    ProductSearchResponseDTO getProductById(Long id);

    List<ProductSearchResponseDTO> searchProducts(
            String name,
            String tags,
            String category,
            String size,
            String gender
    );


    Product createProduct(Product product);


    Product updateProduct(Long id, Product updatedProduct);


    void deleteProduct(Long id);


    ProductVariant addVariant(Long productId, ProductVariant variant);

    ProductVariant updateVariant(Long variantId, ProductVariant updatedVariant);

    void deleteVariant(Long variantId);
}
