package com.stepup.demo.services;

import com.stepup.demo.models.Category;
import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.UserProfile;
import com.stepup.demo.models.dtos.PagedResponse;
import com.stepup.demo.models.dtos.ProductDTO;
import com.stepup.demo.models.dtos.ProductSearchResponseDTO;
import com.stepup.demo.models.dtos.VariantDTO;
import com.stepup.demo.repository.CategoryRepository;
import com.stepup.demo.repository.ProductRepository;
import com.stepup.demo.repository.ProductSpecification;
import com.stepup.demo.repository.ProductVariantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    @Autowired
    ModelMapper modelMapper;


    @Override
    public PagedResponse<Product, Long> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        PagedResponse<Product, Long> pagedResponse = new PagedResponse<>();
        pagedResponse.setJpaRepository(productRepository);
        pagedResponse.processNextPage(pageNumber, pageSize, sortBy, sortOrder);
        List<Product> products = pagedResponse.getContents();
        List<Product> filteredProds = products.stream().filter(p -> Boolean.TRUE.equals(p.getIsActive())).toList();
        pagedResponse.setContents(filteredProds);
        return  pagedResponse;
    }


    @Override
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .filter(p -> Boolean.TRUE.equals(p.getIsActive()))
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        return productDTO;
    }


    @Override
    public PagedResponse<Product, Long> searchProducts(
            String name,
            String tags,
            String category,
            String size,
            String gender,
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortOrder
    ) {
        Specification<Product> spec = ProductSpecification.search(name, tags, category, size, gender);
        PagedResponse<Product, Long>  pagedResponse = new PagedResponse<>();
        pagedResponse.setJpaRepository(productRepository);
        pagedResponse.processNextPageWithSpecs(pageNumber, pageSize, sortBy, sortOrder, spec);
        return pagedResponse;
    }


    @Override
    public Product createProduct(Product product) {
        Category productCategory = product.getCategory();
        Category categoryFromDB = categoryRepository.findByName(productCategory.getName());
        if(categoryFromDB == null) {
            throw new EntityNotFoundException("Could not find category with name: " + productCategory.getName());
        }
        product.setCategory(categoryFromDB);
        product.setIsActive(true);
        return productRepository.save(product);
    }


    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        Category productCategory = updatedProduct.getCategory();
        Category categoryFromDB = categoryRepository.findByName(productCategory.getName());
        if(categoryFromDB == null) {
            throw new EntityNotFoundException("Could not find category with name: " + productCategory.getName());
        }
        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setTags(updatedProduct.getTags());
        existing.setBasePrice(updatedProduct.getBasePrice());
        existing.setGender(updatedProduct.getGender());
        existing.setCategory(categoryFromDB);
        existing.setBrand(updatedProduct.getBrand());
        existing.setReviews(updatedProduct.getReviews());
        existing.setRating(updatedProduct.getRating());

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
    public PagedResponse<ProductVariant, Long> getAllProductVariants(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        PagedResponse<ProductVariant, Long> pagedResponse = new PagedResponse<>();
        pagedResponse.setJpaRepository(productVariantRepository);
        pagedResponse.processNextPage(pageNumber, pageSize, sortBy, sortOrder);
        return pagedResponse;
    }

    @Override
    public List<ProductVariant> getAllProductVariantsByProductId(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
        return productVariantRepository.findByProduct(product);
    }

    @Override
    public ProductVariant getProductVariantById(Long id) {
        return null;
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

    @Override
    public Product updateProductImage(Long productId, MultipartFile image) throws IOException {
        // Get the product from DB
        Product productFromDB = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with productId="+ productId));
        // Upload image to server (into a /image dir)
        // Get the filename of uploaded image
        //String path = "./images";
        String filename = fileService.uploadImage(path, image);
        // Update the new filename to the product
        productFromDB.setProductImage(filename);
        // Save product
        Product savedProduct = productRepository.save(productFromDB);

        return savedProduct;
    }

    @Override
    public List<String> getAllProductImages() {
        List<String> imagesList = productRepository.findAllProductImages();
        return imagesList;
    }

    private ProductSearchResponseDTO mapToDto(Product p) {
        List<VariantDTO> variantDTOs = p.getVariants() == null
                ? List.of()
                : p.getVariants()
                        .stream()
                        .filter(v -> Boolean.TRUE.equals(v.getIsAvailable()))
                        .map(v -> VariantDTO.builder()
                                .id(v.getId())
                                .color(v.getColor())
                                .size(v.getSize())
                                .stock(v.getStock())
                                .priceAdjustment(v.getPriceAdjustment())
                                .is_available(true)
                                .build())
                        .toList();

        return ProductSearchResponseDTO.builder()
                .id(p.getId())
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
