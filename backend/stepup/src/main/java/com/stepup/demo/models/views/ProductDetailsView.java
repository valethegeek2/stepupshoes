package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;


@Entity
@Immutable
@Table(name = "v_product_details")
@Getter
@NoArgsConstructor
public class ProductDetailsView {

    @Id
    @Column(name = "variant_id")
    private Long variantId;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "tags", length = 255)
    private String tags;

    @Column(name = "base_price")
    private BigDecimal basePrice;

    @Column(name = "gender")
    private String gender;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column(name = "color", length = 50)
    private String color;

    @Column(name = "size", length = 20)
    private String size;

    @Column(name = "variant_stock")
    private Integer variantStock;

    @Column(name = "price_adjustment")
    private BigDecimal priceAdjustment;

    @Column(name = "final_price")
    private BigDecimal finalPrice;

    @Column(name = "is_available")
    private Boolean isAvailable;

    @Column(name = "image_url", length = 500)
    private String imageUrl;
}
