package com.stepup.demo.models.dtos;

import com.stepup.demo.models.Order;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotBlank
    @Size(min = 1, max = 100)
    private String firstName;

    @NotBlank
    @Size(min = 1, max = 100)
    private String lastName;

    @NotBlank
    @Size(min = 1, max = 16)
    private String phoneNumber;

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
