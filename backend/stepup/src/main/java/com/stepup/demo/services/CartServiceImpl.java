package com.stepup.demo.services;

import com.stepup.demo.models.CartItem;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.User;
import com.stepup.demo.models.dtos.AddToCartRequestDTO;
import com.stepup.demo.models.dtos.CartItemResponseDTO;
import com.stepup.demo.repository.CartItemRepository;
import com.stepup.demo.repository.ProductVariantRepository;
import com.stepup.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;

    @Override
    public List<CartItemResponseDTO> getCartItems(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        return cartItemRepository.findByUser(user)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public void addToCart(String username, AddToCartRequestDTO req) {

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        ProductVariant variant = variantRepository.findById(req.getVariantId())
                .orElseThrow();

        if (req.getQuantity() <= 0)
            throw new IllegalArgumentException("Quantity must be positive");

        if (req.getQuantity() > variant.getStock())
            throw new IllegalArgumentException("Not enough stock");

        CartItem item = cartItemRepository
                .findByUserAndVariant(user, variant)
                .orElse(null);

        if (item == null) {
            item = CartItem.builder()
                    .user(user)
                    .variant(variant)
                    .quantity(req.getQuantity())
                    .build();
        } else {
            int newQty = item.getQuantity() + req.getQuantity();
            if (newQty > variant.getStock())
                throw new IllegalArgumentException("Not enough stock");

            item.setQuantity(newQty);
        }

        cartItemRepository.save(item);
    }

    @Override
    public void removeFromCart(String username, Long variantId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        ProductVariant variant = variantRepository.findById(variantId)
                .orElseThrow();

        cartItemRepository.deleteByUserAndVariant(user, variant);
    }

    private CartItemResponseDTO mapToDto(CartItem item) {
        float price = item.getVariant().getProduct().getBasePrice()
                + item.getVariant().getPriceAdjustment();

        return CartItemResponseDTO.builder()
                .variantId(item.getVariant().getVariantId())
                .productName(item.getVariant().getProduct().getName())
                .color(item.getVariant().getColor())
                .size(item.getVariant().getSize())
                .price(price)
                .quantity(item.getQuantity())
                .subtotal(price * item.getQuantity())
                .build();
    }
}
