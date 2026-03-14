package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.time.Instant;


@Entity
@Immutable
@Table(name = "v_wishlist_details")
@Getter
@NoArgsConstructor
public class WishlistDetailsView {

    @Id
    @Column(name = "wishlist_item_id")
    private Long wishlistItemId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "added_at")
    private Instant addedAt;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "base_price")
    private BigDecimal basePrice;

    @Column(name = "gender")
    private String gender;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column(name = "total_stock")
    private Integer totalStock;

    @Column(name = "min_price")
    private BigDecimal minPrice;

    @Column(name = "max_price")
    private BigDecimal maxPrice;

    @Column(name = "in_stock")
    private Boolean inStock;

    @Column(name = "image_url", length = 500)
    private String imageUrl;
}
