package com.stepup.demo.models.views;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Immutable
@Table(name = "v_daily_sales_report")
@Getter
@NoArgsConstructor
public class DailySalesReportView {

    @Id
    @Column(name = "sale_date")
    private LocalDate saleDate;
    
    @Column(name = "total_orders")
    private Integer totalOrders;

    @Column(name = "unique_customers")
    private Integer uniqueCustomers;

    @Column(name = "daily_revenue")
    private BigDecimal dailyRevenue;

    @Column(name = "avg_order_value")
    private BigDecimal avgOrderValue;

    @Column(name = "total_items_sold")
    private Integer totalItemsSold;

    @Column(name = "credit_card_revenue")
    private BigDecimal creditCardRevenue;

    @Column(name = "paypal_revenue")
    private BigDecimal paypalRevenue;

    @Column(name = "cash_revenue")
    private BigDecimal cashRevenue;

    @Column(name = "delivered_count")
    private Integer deliveredCount;

    @Column(name = "cancelled_count")
    private Integer cancelledCount;

    @Column(name = "failed_count")
    private Integer failedCount;
}
