package com.teamstep.stepup.repository;

import com.teamstep.stepup.models.views.ProductCatalogView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
interface ProductViewRepository extends JpaRepository<AbstractPersistable, PK> {
}
*/
/**
 * Repository για το ProductCatalogView
 * Spring Data JPA δημιουργεί αυτόματα τα queries από τα method names!
 */
@Repository
public interface ProductViewRepository extends JpaRepository<ProductCatalogView, Integer> {

    // ===============================
    // SEARCH METHODS
    // ===============================

    /**
     * Search by product name (case-insensitive, partial match)
     * Αυτόματο query: SELECT * FROM v_product_catalog WHERE LOWER(name) LIKE LOWER(?1)
     */
    List<ProductCatalogView> findByNameContainingIgnoreCase(String name);

    /**
     * Search στο name ΚΑΙ tags
     * Custom JPQL query
     */
    @Query("SELECT p FROM ProductCatalogView p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.tags) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<ProductCatalogView> searchByNameOrTags(@Param("query") String query);

    /**
     * Full-text search με multiple keywords
     * Ψάχνει σε name, tags
     */
    @Query("SELECT DISTINCT p FROM ProductCatalogView p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.tags) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ProductCatalogView> searchByKeyword(@Param("keyword") String keyword);

    // ===============================
    // FILTER METHODS
    // ===============================

    /**
     * Filter by category
     */
    List<ProductCatalogView> findByCategoryName(String categoryName);

    /**
     * Filter by gender
     */
    List<ProductCatalogView> findByGender(ProductCatalogView.Gender gender);

    /**
     * Filter by in stock only
     */
    List<ProductCatalogView> findByInStockTrue();

    /**
     * Filter by category AND gender
     */
    List<ProductCatalogView> findByCategoryNameAndGender(String categoryName, ProductCatalogView.Gender gender);

    /**
     * Filter by price range
     */
    @Query("SELECT p FROM ProductCatalogView p WHERE p.minPrice >= :minPrice AND p.maxPrice <= :maxPrice")
    List<ProductCatalogView> findByPriceRange(@Param("minPrice") double minPrice,
                                              @Param("maxPrice") double maxPrice);

    /**
     * Complex filter: search + category + gender + price range + in stock
     * Αυτό είναι το "ultimate" filter method για το frontend
     */
    @Query("SELECT p FROM ProductCatalogView p WHERE " +
            "(:query IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.tags) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
            "(:categoryName IS NULL OR p.categoryName = :categoryName) AND " +
            "(:gender IS NULL OR p.gender = :gender) AND " +
            "(:minPrice IS NULL OR p.minPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.maxPrice <= :maxPrice) AND " +
            "(:inStockOnly = false OR p.inStock = true)")
    List<ProductCatalogView> searchWithFilters(
            @Param("query") String query,
            @Param("categoryName") String categoryName,
            @Param("gender") ProductCatalogView.Gender gender,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("inStockOnly") boolean inStockOnly
    );

    // ===============================
    // SORTING METHODS (για μετά)
    // ===============================

    /**
     * Get all products ordered by name
     */
    List<ProductCatalogView> findAllByOrderByNameAsc();

    /**
     * Get all products ordered by price (ascending)
     */
    List<ProductCatalogView> findAllByOrderByMinPriceAsc();

    /**
     * Get all products ordered by price (descending)
     */
    List<ProductCatalogView> findAllByOrderByMinPriceDesc();
}