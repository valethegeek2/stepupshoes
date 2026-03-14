package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.time.Instant;

/**
 * Read-only entity mapped to the {@code v_user_order_stats} database view.
 *
 * <p>Designed for user profile pages and admin customer segmentation.
 * Provides aggregated order statistics per customer — total spend, average
 * order value, status breakdown, and first/last order dates.
 *
 * <pre>
 * SQL View : v_user_order_stats
 * Sources  : users u
 *            LEFT JOIN user_profiles up ON u.user_id = up.user_id
 *            LEFT JOIN orders o         ON u.user_id = o.user_id
 * Filter   : u.role = 'customer'
 * Grouped  : u.user_id, up.user_id
 * </pre>
 */
@Entity
@Immutable
@Table(name = "v_user_order_stats")
@Getter
@NoArgsConstructor
public class OrderStatsView {

    // ─────────────────────────────────────────────
    //  User identity fields
    // ─────────────────────────────────────────────

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "email", length = 100)
    private String email;

    /**
     * CONCAT(first_name, ' ', last_name) — may be a blank string
     * if the user has no profile yet (COALESCE pads with empty strings).
     */
    @Column(name = "full_name")
    private String fullName;

    // ─────────────────────────────────────────────
    //  Order statistics
    // ─────────────────────────────────────────────

    /** COUNT(DISTINCT order_id) — total number of orders placed by this user. */
    @Column(name = "total_orders")
    private Integer totalOrders;

    /**
     * COALESCE(SUM(total_amount), 0) — lifetime spend.
     * Never {@code null}; returns 0 for users with no orders.
     */
    @Column(name = "total_spent")
    private BigDecimal totalSpent;

    /**
     * COALESCE(AVG(total_amount), 0) — average order value.
     * Never {@code null}; returns 0 for users with no orders.
     */
    @Column(name = "avg_order_value")
    private BigDecimal avgOrderValue;

    // ─────────────────────────────────────────────
    //  Order status breakdown
    // ─────────────────────────────────────────────

    /** Count of orders with status = 'delivered'. */
    @Column(name = "delivered_orders")
    private Integer deliveredOrders;

    /** Count of orders with status = 'cancelled'. */
    @Column(name = "cancelled_orders")
    private Integer cancelledOrders;

    /**
     * Count of orders with status IN
     * ('pending', 'confirmed', 'processing', 'shipped').
     */
    @Column(name = "active_orders")
    private Integer activeOrders;

    // ─────────────────────────────────────────────
    //  Order date range
    // ─────────────────────────────────────────────

    /** MIN(order_date) — date of the customer's very first order. */
    @Column(name = "first_order_date")
    private Instant firstOrderDate;

    /** MAX(order_date) — date of the customer's most recent order. */
    @Column(name = "last_order_date")
    private Instant lastOrderDate;
}
