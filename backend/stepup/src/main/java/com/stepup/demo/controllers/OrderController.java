package com.stepup.demo.controllers;

import com.stepup.demo.models.dtos.OrderDTO;
import com.stepup.demo.models.dtos.PlaceOrderRequestDTO;
import com.stepup.demo.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> placeOrder(
            @Valid @RequestBody PlaceOrderRequestDTO request,
            Authentication auth
    ) {
        OrderDTO order = orderService.placeOrder(auth.getName(), request);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getMyOrders(Authentication auth) {
        return new ResponseEntity<>(orderService.getOrdersByUser(auth.getName()), HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(
            @PathVariable Long orderId,
            Authentication auth
    ) {
        return new ResponseEntity<>(orderService.getOrderById(orderId, auth.getName()), HttpStatus.OK);
    }
}
