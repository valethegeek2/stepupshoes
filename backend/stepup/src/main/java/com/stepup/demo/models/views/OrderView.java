package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Immutable
@Table(name = "v_order_summary")
@Getter
@NoArgsConstructor
public class OrderView {

    @Id
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "order_date")
    private Instant orderDate;

    @Column(name = "total_amount", precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "status")
    private String status;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "shipping_address", columnDefinition = "TEXT")
    private String shippingAddress;

    @Column(name = "shipping_city", length = 100)
    private String shippingCity;

    @Column(name = "shipping_postal_code", length = 20)
    private String shippingPostalCode;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "total_items")
    private Integer totalItems;

    @Column(name = "total_quantity")
    private Integer totalQuantity;
}
