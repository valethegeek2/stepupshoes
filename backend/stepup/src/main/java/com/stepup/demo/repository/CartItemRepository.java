package com.stepup.demo.repository;

import com.stepup.demo.models.CartItem;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUser(User user);

    Optional<CartItem> findByUserAndVariant(User user, ProductVariant variant);

    void deleteByUserAndVariant(User user, ProductVariant variant);
}
