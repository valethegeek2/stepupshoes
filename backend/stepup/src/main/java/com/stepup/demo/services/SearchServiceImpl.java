package com.stepup.demo.services;

import com.stepup.demo.models.Product;
import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import com.stepup.demo.models.dtos.VariantDTO;
import com.stepup.demo.repository.ProductRepository;
import com.stepup.demo.repository.ProductSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchServiceImpl implements SearchService {

    private final ProductRepository productRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<ProductSearchResponseDTO> searchProducts(
            String name,
            String tags,
            String category,
            String size,
            String gender
    ) {

        Specification<Product> spec =
                ProductSpecification.search(name, tags, category, size, gender);

        return productRepository.findAll(spec)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private ProductSearchResponseDTO mapToDto(Product p) {

//        List<VariantDTO> variants = p.getVariants()
//                .stream()
//                .filter(v -> Boolean.TRUE.equals(v.getIsAvailable()))
//                .map(v -> VariantDTO.builder()
//                        .variantId(v.getVariantId())
//                        .color(v.getColor())
//                        .size(v.getSize())
//                        .stock(v.getStock())
//                        .finalPrice(p.getBasePrice() + v.getPriceAdjustment())
//                        .build())
//                .toList();


        List<VariantDTO> variants = p.getVariants()
                .stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsAvailable()))
                .map(v -> {
                    VariantDTO dto = modelMapper.map(v, VariantDTO.class);
                    dto.setFinalPrice(p.getBasePrice() + v.getPriceAdjustment());
                    return dto;
                })
                .toList();

        return ProductSearchResponseDTO.builder()
                .productId(p.getProductId())
                .name(p.getName())
                .description(p.getDescription())
                .basePrice(p.getBasePrice())
                .gender(p.getGender().name())
                .category(p.getCategory().getName())
                .tags(p.getTags())
                .variants(variants)
                .build();
    }
}
