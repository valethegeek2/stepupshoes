package com.stepup.demo.repository;

import java.util.ArrayList;
import java.util.List;

import com.stepup.demo.models.Gender;
import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    public static Specification<Product> search(
            String name,
            String tags,
            String category,
            String size,
            String gender
    ) {

        return (root, query, cb) -> {

            root.fetch("variants", JoinType.LEFT);
            query.distinct(true);

            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isBlank()) {
                predicates.add(cb.like(
                        cb.lower(root.get("name")),
                        "%" + name.toLowerCase() + "%"
                ));
            }

            if (gender != null) {
                predicates.add(cb.equal(root.get("gender"), Gender.valueOf(gender.toUpperCase())));
            }

            if (category != null) {
                predicates.add(cb.equal(
                        cb.lower(root.get("category").get("name")),
                        category.toLowerCase()
                ));
            }

            if (size != null) {
                Join<Product, ProductVariant> variants =
                        root.join("variants", JoinType.INNER);

                predicates.add(cb.equal(variants.get("size"), size));
            }

            if (tags != null) {
                predicates.add(
                        cb.like(cb.lower(root.get("tags")), "%" + tags.toLowerCase() + "%")
                );
            }

            predicates.add(cb.isTrue(root.get("isActive")));

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
