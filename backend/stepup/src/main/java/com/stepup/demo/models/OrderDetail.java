package com.stepup.demo.models;

import com.stepup.demo.repository.ProductRepository;
import jakarta.persistence.*;
import lombok.Data;

/*
Eftiaksa auto to entity gia na mporw
na treksw tin efarmogi, den einai teliomeni
 */
@Entity
@Data
public class OrderDetail {
    @Id
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    Order order;
}
