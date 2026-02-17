package com.stepup.demo.controllers;

import com.stepup.demo.models.dtos.AddToCartRequestDTO;
import com.stepup.demo.models.dtos.CartItemResponseDTO;
import com.stepup.demo.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    @Autowired
    private final CartService cartService;

    @GetMapping
    public List<CartItemResponseDTO> getCart(Authentication auth) {
        return cartService.getCartItems(auth.getName());
    }

    @PostMapping
    public ResponseEntity<Void> addToCart(
            @RequestBody AddToCartRequestDTO request,
            Authentication auth) {

        cartService.addToCart(auth.getName(), request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{variantId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long variantId,
            Authentication auth) {

        cartService.removeFromCart(auth.getName(), variantId);
        return ResponseEntity.noContent().build();
    }
}
