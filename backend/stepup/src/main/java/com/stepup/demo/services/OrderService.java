package com.stepup.demo.services;

import com.stepup.demo.models.Order;
import com.stepup.demo.models.dtos.OrderDTO;
import com.stepup.demo.models.dtos.PagedResponse;
import com.stepup.demo.models.dtos.PlaceOrderRequestDTO;

import java.util.List;

public interface OrderService {

    OrderDTO placeOrder(String username, PlaceOrderRequestDTO request);
    List<OrderDTO> getOrdersByUser(String username);
    OrderDTO getOrderById(Long orderId, String username);
    PagedResponse<Order, Long> getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    OrderDTO updateOrderStatus(Long orderId, String status);
}
