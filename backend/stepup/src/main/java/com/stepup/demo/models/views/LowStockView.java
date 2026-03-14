package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Immutable
@Table(name = "v_low_stock_alerts")
@Getter
@NoArgsConstructor
public class LowStockView {

    @Id
    @Column(name = "variant_id")
    private Long variantId;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "color", length = 50)
    private String color;

    @Column(name = "size", length = 20)
    private String size;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "stock_status")
    private String stockStatus;
}
