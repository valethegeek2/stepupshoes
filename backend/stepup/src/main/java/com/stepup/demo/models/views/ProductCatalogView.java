package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "v_product_catalog")
@Getter
@NoArgsConstructor
public class ProductCatalogView {

    @Id
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "tags", length = 255)
    private String tags;

    @Column(name = "base_price")
    private Float basePrice;

    @Column(name = "gender")
    private String gender;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column(name = "total_stock")
    private Integer totalStock;

    @Column(name = "variant_count")
    private Integer variantCount;

    @Column(name = "primary_image_url", length = 500)
    private String primaryImageUrl;

    @Column(name = "in_stock")
    private Boolean inStock;
}
