package com.stepup.demo.controllers;

import com.stepup.demo.models.dtos.AddToCartRequestDTO;
import com.stepup.demo.models.dtos.CartItemResponseDTO;
import com.stepup.demo.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItemResponseDTO>> getCart(Authentication auth) {
        return new ResponseEntity<>(cartService.getCartItems(auth.getName()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> addToCart(
            @RequestBody AddToCartRequestDTO request,
            Authentication auth) {
        cartService.addToCart(auth.getName(), request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{variantId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long variantId,
            Authentication auth) {
        cartService.removeFromCart(auth.getName(), variantId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}