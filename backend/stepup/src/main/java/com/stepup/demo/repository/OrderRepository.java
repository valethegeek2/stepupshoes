package com.stepup.demo.repository;

import com.stepup.demo.models.Order;
import com.stepup.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
}
