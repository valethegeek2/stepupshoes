package com.stepup.demo.models;

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
    private Long id;

    private String name;
    private String description;
    private String brand;
    private String productImage; // Save image filename

    @Column(length = 255)
    private String tags;
    private float basePrice;

    private Long reviews;

    private float rating;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column (name = "is_active")
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<ProductVariant> variants;
}
