package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

/**
 * Entity που map-άρει στο database view: v_product_catalog
 * Χρησιμοποιείται για product listing, search, filters
 * READ-ONLY (Immutable) - δεν μπορείς να κάνεις INSERT/UPDATE
 */
@Getter
@Entity
@Immutable  // ΣΗΜΑΝΤΙΚΟ! Views είναι read-only
@Table(name = "v_product_catalog")
public class ProductCatalogView {

    // Getters and Setters
    @Id
    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "name")
    private String name;

    @Column(name = "tags")
    private String tags;

    @Column(name = "base_price")
    private BigDecimal basePrice;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    // Category info
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "category_name")
    private String categoryName;

    // Stock and variants
    @Column(name = "total_stock")
    private Integer totalStock;

    @Column(name = "variant_count")
    private Integer variantCount;

    @Column(name = "primary_image_url")
    private String primaryImageUrl;

    @Column(name = "in_stock")
    private Boolean inStock;

    // Constructors
    public ProductCatalogView() {
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setTotalStock(Integer totalStock) {
        this.totalStock = totalStock;
    }

    public void setVariantCount(Integer variantCount) {
        this.variantCount = variantCount;
    }

    public void setPrimaryImageUrl(String primaryImageUrl) {
        this.primaryImageUrl = primaryImageUrl;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }

    // Enum για Gender
    public enum Gender {
        men, women, kids, unisex
    }
}