package com.stepup.demo.models.dtos;

import com.stepup.demo.models.Order;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlaceOrderRequestDTO {

    @NotBlank
    private String shippingAddress;

    @NotBlank
    private String shippingCity;

    @NotBlank
    private String shippingPostalCode;

    @NotNull
    private Order.PaymentMethod paymentMethod;

    private String notes;
}
