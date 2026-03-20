package com.stepup.demo.models.dtos;

import com.stepup.demo.models.Order;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private Long orderId;
    private Long userId;
    private Instant orderDate;
    @NotNull
    private BigDecimal totalAmount;
    @NotNull
    private Order.OrderStatus status;
    @NotBlank
    private String shippingAddress;
    private String shippingCity;
    private String shippingPostalCode;
    @NotNull
    private Order.PaymentMethod paymentMethod;
    private Order.PaymentStatus paymentStatus;
    private String notes;
    private Instant updatedAt;
}
