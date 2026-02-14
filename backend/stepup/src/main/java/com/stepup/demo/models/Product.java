package com.stepup.demo.models;

import com.stepup.demo.models.views.ProductVariant;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String tags;

    private float basePrice;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private Set<ProductVariant> variants;
}
