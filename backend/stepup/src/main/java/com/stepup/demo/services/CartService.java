package com.stepup.demo.services;

import com.stepup.demo.models.dtos.AddToCartRequestDTO;
import com.stepup.demo.models.dtos.CartItemResponseDTO;

import java.util.List;

public interface CartService {
    public List<CartItemResponseDTO> getCartItems(String username);
    public void addToCart(String username, AddToCartRequestDTO req);
    public void removeFromCart(String username, Long variantId);
}
