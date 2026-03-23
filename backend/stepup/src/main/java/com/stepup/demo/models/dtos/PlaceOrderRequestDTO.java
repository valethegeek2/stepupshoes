package com.stepup.demo.models.dtos;

import com.stepup.demo.models.Order;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PlaceOrderRequestDTO {

    @NotBlank
    @Size(min = 1, max = 100)
    private String firstName;

    @NotBlank
    @Size(min = 1, max = 100)
    private String lastName;

    @NotBlank
    @Size(min = 1, max = 16)
    private String phoneNumber;

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
