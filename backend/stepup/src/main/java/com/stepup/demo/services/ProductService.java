package com.stepup.demo.services;

import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    Product updateProductImage(Long productId, MultipartFile image) throws IOException;

    List<String> getAllProductImages();
}
