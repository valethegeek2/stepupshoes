package com.stepup.demo.services;

import com.stepup.demo.models.CartItem;
import com.stepup.demo.models.Order;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.User;
import com.stepup.demo.models.dtos.OrderDTO;
import com.stepup.demo.models.dtos.PagedResponse;
import com.stepup.demo.models.dtos.PlaceOrderRequestDTO;
import com.stepup.demo.repository.CartItemRepository;
import com.stepup.demo.repository.OrderRepository;
import com.stepup.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public OrderDTO placeOrder(String username, PlaceOrderRequestDTO request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));

        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Cannot place an order with an empty cart");
        }

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            ProductVariant variant = item.getVariant();

            if (!Boolean.TRUE.equals(variant.getIsAvailable())) {
                throw new IllegalStateException(
                        "Variant is no longer available: " + variant.getVariantId());
            }
            if (item.getQuantity() > variant.getStock()) {
                throw new IllegalStateException(
                        "Not enough stock for variant: " + variant.getVariantId()
                        + ". Requested: " + item.getQuantity()
                        + ", available: " + variant.getStock());
            }

            float unitPrice = variant.getProduct().getBasePrice() + variant.getPriceAdjustment();
            total = total.add(BigDecimal.valueOf(unitPrice * item.getQuantity()));
        }

        Order order = Order.builder()
                .user(user)
                .totalAmount(total)
                .status(Order.OrderStatus.pending)
                .shippingAddress(request.getShippingAddress())
                .shippingCity(request.getShippingCity())
                .shippingPostalCode(request.getShippingPostalCode())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(Order.PaymentStatus.pending)
                .notes(request.getNotes())
                .build();

        orderRepository.save(order);

        // 6. Deduct stock from each variant
        for (CartItem item : cartItems) {
            ProductVariant variant = item.getVariant();
            int updatedStock = variant.getStock() - item.getQuantity();
            variant.setStock(updatedStock);
            if (updatedStock == 0) {
                variant.setIsAvailable(false);
            }
        }

        cartItemRepository.deleteAll(cartItems);

        return modelMapper.map(order, OrderDTO.class);
    }


    @Override
    public List<OrderDTO> getOrdersByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));

        return orderRepository.findByUser(user)
                .stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList();
    }


    @Override
    public OrderDTO getOrderById(Long orderId, String username) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderId));

        if (!order.getUser().getUsername().equals(username)) {
            throw new SecurityException("Access denied to order: " + orderId);
        }

        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public PagedResponse<Order, Long> getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        PagedResponse<Order, Long> pagedResponse = new PagedResponse<>();
        pagedResponse.setJpaRepository(orderRepository);
        pagedResponse.processNextPage(pageNumber, pageSize, sortBy, sortOrder);
        return pagedResponse;
    }

    @Override
    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderId));

        try {
            order.setStatus(Order.OrderStatus.valueOf(status.toLowerCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid order status: " + status);
        }

        return modelMapper.map(orderRepository.save(order), OrderDTO.class);
    }
}
