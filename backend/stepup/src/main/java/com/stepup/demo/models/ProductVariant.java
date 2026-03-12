package com.stepup.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String variantImage;

    @ManyToOne(fetch = FetchType.LAZY,  cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "product_id")
    private Product product;

}


