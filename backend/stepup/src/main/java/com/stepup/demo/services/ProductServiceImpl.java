package com.stepup.demo.services;

import com.stepup.demo.models.Category;
import com.stepup.demo.models.Gender;
import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import com.stepup.demo.models.dtos.VariantDTO;
import com.stepup.demo.repository.ProductRepository;
import com.stepup.demo.repository.ProductSpecification;
import com.stepup.demo.repository.ProductVariantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional

public class ProductServiceImpl {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;


    @Override
    public List<ProductSearchResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getIsActive()))
                .map(this::mapToDto)
                .toList();
    }


    @Override
    public ProductSearchResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .filter(p -> Boolean.TRUE.equals(p.getIsActive()))
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        return mapToDto(product);
    }


    @Override
    public List<ProductSearchResponseDTO> searchProducts(
            String name,
            String tags,
            String category,
            String size,
            String gender
    ) {
        Specification<Product> spec = ProductSpecification.search(name, tags, category, size, gender);
        return productRepository.findAll(spec)
                .stream()
                .map(this::mapToDto)
                .toList();
    }


    @Override
    public Product createProduct(Product product) {
        product.setIsActive(true);
        return productRepository.save(product);
    }


    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));

        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setTags(updatedProduct.getTags());
        existing.setBasePrice(updatedProduct.getBasePrice());
        existing.setGender(updatedProduct.getGender());
        existing.setCategory(updatedProduct.getCategory());

        if (updatedProduct.getIsActive() != null) {
            existing.setIsActive(updatedProduct.getIsActive());
        }

        return productRepository.save(existing);
    }


    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        product.setIsActive(false);
        productRepository.save(product);
    }


    @Override
    public ProductVariant addVariant(Long productId, ProductVariant variant) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
        variant.setProduct(product);
        if (variant.getIsAvailable() == null) {
            variant.setIsAvailable(true);
        }
        return productVariantRepository.save(variant);
    }

    @Override
    public ProductVariant updateVariant(Long variantId, ProductVariant updatedVariant) {
        ProductVariant existing = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new EntityNotFoundException("Variant not found with id: " + variantId));

        existing.setColor(updatedVariant.getColor());
        existing.setSize(updatedVariant.getSize());
        existing.setStock(updatedVariant.getStock());
        existing.setPriceAdjustment(updatedVariant.getPriceAdjustment());
        existing.setIsAvailable(updatedVariant.getIsAvailable());

        return productVariantRepository.save(existing);
    }

    @Override
    public void deleteVariant(Long variantId) {
        if (!productVariantRepository.existsById(variantId)) {
            throw new EntityNotFoundException("Variant not found with id: " + variantId);
        }
        productVariantRepository.deleteById(variantId);
    }

    private ProductSearchResponseDTO mapToDto(Product p) {
        List<VariantDTO> variantDTOs = p.getVariants() == null
                ? List.of()
                : p.getVariants()
                        .stream()
                        .filter(v -> Boolean.TRUE.equals(v.getIsAvailable()))
                        .map(v -> VariantDTO.builder()
                                .variantId(v.getVariantId())
                                .color(v.getColor())
                                .size(v.getSize())
                                .stock(v.getStock())
                                .finalPrice(p.getBasePrice() + v.getPriceAdjustment())
                                .is_available(true)
                                .build())
                        .toList();

        return ProductSearchResponseDTO.builder()
                .productId(p.getProductId())
                .name(p.getName())
                .description(p.getDescription())
                .tags(p.getTags())
                .basePrice(p.getBasePrice())
                .gender(p.getGender() != null ? p.getGender().name() : null)
                .category(p.getCategory() != null ? p.getCategory().getName() : null)
                .variants(variantDTOs)
                .build();
    }
}
