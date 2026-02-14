package com.stepup.demo.models.views;

import com.stepup.demo.models.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_variants",
        uniqueConstraints = @UniqueConstraint(columnNames = {"product_id","color","size"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long variantId;

    private String color;
    private String size;
    private Integer stock;

    private float priceAdjustment;

    private Boolean isAvailable;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}


