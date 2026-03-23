package com.stepup.demo.services;

import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.dtos.PagedResponse;
import com.stepup.demo.models.dtos.ProductDTO;
import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {


    PagedResponse<Product, Long> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO getProductById(Long id);

    PagedResponse<Product, Long> searchProducts(
            String name,
            String tags,
            String category,
            String size,
            String gender,
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortOrder
    );


    Product createProduct(Product product);


    Product updateProduct(Long id, Product updatedProduct);


    void deleteProduct(Long id);

    PagedResponse<ProductVariant, Long> getAllProductVariants(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    List<ProductVariant> getAllProductVariantsByProductId(Long productId);

    ProductVariant getProductVariantById(Long id);

    ProductVariant addVariant(Long productId, ProductVariant variant);

    ProductVariant updateVariant(Long variantId, ProductVariant updatedVariant);

    void deleteVariant(Long variantId);

    Product updateProductImage(Long productId, MultipartFile image) throws IOException;

    List<String> getAllProductImages();
}
