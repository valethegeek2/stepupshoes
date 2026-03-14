package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Immutable
@Table(name = "v_cart_details")
@Getter
@NoArgsConstructor
public class CartView {

    @Id
    @Column(name = "cart_item_id")
    private Long cartItemId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "base_price")
    private BigDecimal basePrice;

    @Column(name = "variant_id")
    private Long variantId;

    @Column(name = "color", length = 50)
    private String color;

    @Column(name = "size", length = 20)
    private String size;

    @Column(name = "available_stock")
    private Integer availableStock;

    @Column(name = "price_adjustment")
    private BigDecimal priceAdjustment;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "subtotal")
    private BigDecimal subtotal;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "is_available")
    private Boolean isAvailable;

    @Column(name = "category_name", length = 100)
    private String categoryName;
}
