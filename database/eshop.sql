USE eshop;

-- ================= Final Corrected E-shop Schema =================
-- For related documentation see ERDiagram.png, ...

-- Disable foreign key checks, for easier table creation
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables (if re-running)
-- DROP TABLE IF EXISTS order_details;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS cart_items;
-- DROP TABLE IF EXISTS wishlist_items;
-- DROP TABLE IF EXISTS product_images;
-- DROP TABLE IF EXISTS product_variants;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS categories;
-- DROP TABLE IF EXISTS user_profiles;
-- DROP TABLE IF EXISTS users;

-- ====================================================
--  Users
-- Represents the user account, but only the basic
-- stuff required for login, and RBAC 
-- (Role Based Access Control)
-- ====================================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer','admin') NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- NOTE: username & email already have automatic indexes (UNIQUE constraint)
);

-- ====================================================
--  User profiles (1:1 with users)
-- Is the equivalent user profile for each user
-- Separated for security reasons, as the user_profiles
-- could be stored in a different database.
-- ====================================================
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    phone_number VARCHAR(20),
    birthdate DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    -- ON DELETE CASCADE: If the underlying user is deleted, delete their user profile as well
);

-- ====================================================
--  Categories
-- Represents the categories in which each product belongs
-- ====================================================
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- ====================================================
--  Product
-- Represents the base class of what a product is
-- It only represents the common traits of a product,
-- product_variants are the actual products.
-- ====================================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    tags VARCHAR(255),
    base_price DECIMAL(10,2) NOT NULL COMMENT 'Base price - actual price may vary by variant',
    gender ENUM('men', 'women', 'kids', 'unisex') NOT NULL DEFAULT 'unisex',
    category_id INT,
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Soft delete flag',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL ON UPDATE CASCADE,
    -- *ON DELETE SET NULL* : When the connected category is deleted just set the category to NULL.
    -- *ON UPDATE CASCADE*  : When the category id changes, change the equivalent one this one was pointing to.
    INDEX idx_category (category_id),
    INDEX idx_gender (gender),
    INDEX idx_active (is_active)
);

-- ====================================================
--  Product variants
-- Represents a variant of a *base product* that can
-- have (notably) color, size, image(via the 
-- product_images table) 
-- ====================================================
CREATE TABLE product_variants (
    variant_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    size VARCHAR(20) NOT NULL,
    sku VARCHAR(100) UNIQUE COMMENT 'Stock Keeping Unit - unique identifier', -- Probably wont be used in current scope
    stock INT NOT NULL DEFAULT 0,
    price_adjustment DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Price difference from base_price',
    is_available BOOLEAN DEFAULT TRUE,
    UNIQUE KEY unique_variant (product_id, color, size),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_stock (stock),
    INDEX idx_available (is_available)
);

-- ====================================================
--  Product images
-- Each variant has an image, an there is an image
-- for each product so it can be viewed from the main
-- product page
-- ====================================================
CREATE TABLE product_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    variant_id INT NULL COMMENT 'NULL = general product image, NOT NULL = variant-specific',
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    position INT DEFAULT 0 COMMENT 'Display order in gallery',
    is_primary BOOLEAN DEFAULT FALSE COMMENT 'Main image for product/variant',
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_variant (variant_id),
    INDEX idx_position (position)
);

-- ====================================================
--  Wishlist items
-- Without variant_id for simplicity
-- ====================================================
CREATE TABLE wishlist_items (
    wishlist_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_wishlist_product (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_user (user_id)
);

-- ====================================================
--  Cart items
-- Represents a cart 'Item' in the cart with
-- the selected quantity
-- ====================================================
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    variant_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    UNIQUE KEY unique_cart_variant (user_id, variant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_variant (variant_id)
);

-- ====================================================
--  Orders
-- Represents an order that is placed by a customer
-- it summarized information like: total sum of the 
-- order, shipping address, payment method.
-- The details or individual items are added in the
-- *order_details* table.
-- ====================================================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','confirmed','processing','shipped','delivered','cancelled','failed') 
        NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(100),
    shipping_postal_code VARCHAR(20),
    payment_method ENUM('cash','credit_card','paypal') NOT NULL,
    payment_status ENUM('pending','completed','failed') DEFAULT 'pending',
    notes TEXT COMMENT 'Order notes or admin comments',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_order_date (order_date)
);

-- ====================================================
--  Orders details
-- Represents the individual items that are added in
-- the order.
-- ====================================================
CREATE TABLE order_details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    variant_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_per_item DECIMAL(10,2) NOT NULL COMMENT 'Price at time of order',
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price_per_item) STORED,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_variant (variant_id)
);

SET FOREIGN_KEY_CHECKS = 1;
-- ================= E-shop Database Views (Final) =================
-- Some usefull views that will help the backend with
-- easier read-only data for quick response

-- ==================================================
-- 1. PRODUCT CATALOG VIEW
-- Usage: Product listing, search, filters
-- Contains: Product info, category, stock, price range, primary image
-- ==================================================
CREATE OR REPLACE VIEW v_product_catalog AS
SELECT 
    p.product_id,
    p.name,
    p.tags,
    p.base_price,
    p.gender,
    
    -- Category info
    c.category_id,
    c.name AS category_name,
    
    -- Stock calculations from variants
    SUM(pv.stock) AS total_stock,
    COUNT(DISTINCT pv.variant_id) AS variant_count,
    
    -- Price range from variants
    MIN(p.base_price + pv.price_adjustment) AS min_price,
    MAX(p.base_price + pv.price_adjustment) AS max_price,
    
    -- Primary image (γενική εικόνα προϊόντος)
    (SELECT pi.url 
     FROM product_images pi 
     WHERE pi.product_id = p.product_id 
       AND pi.is_primary = TRUE 
       AND pi.variant_id IS NULL 
     LIMIT 1) AS primary_image_url,
    
    -- Availability check
    CASE 
        WHEN SUM(pv.stock) > 0 THEN TRUE 
        ELSE FALSE 
    END AS in_stock
    
FROM products p
LEFT JOIN categories c ON p.category_id = c.category_id
LEFT JOIN product_variants pv ON p.product_id = pv.product_id AND pv.is_available = TRUE
WHERE p.is_active = TRUE
GROUP BY p.product_id, c.category_id;


-- -- ==================================================
-- -- 2. PRODUCT FULL DETAILS VIEW
-- -- Χρήση: Product detail page
-- -- Περιλαμβάνει: Όλα τα variants με τα images τους
-- -- ==================================================
-- CREATE OR REPLACE VIEW v_product_details AS
-- SELECT 
--     p.product_id,
--     p.name AS product_name,
--     p.description,
--     p.tags,
--     p.base_price,
--     p.gender,
--     p.is_active,
--     
--     -- Category
--     c.name AS category_name,
--     
--     -- Variant info
--     pv.variant_id,
--     pv.color,
--     pv.size,
--     pv.sku,
--     pv.stock AS variant_stock,
--     pv.price_adjustment,
--     (p.base_price + pv.price_adjustment) AS final_price,
--     pv.is_available,
--     
--     -- Variant image (ή fallback στο product image)
--     COALESCE(
--         (SELECT pi.url FROM product_images pi 
--          WHERE pi.variant_id = pv.variant_id AND pi.is_primary = TRUE LIMIT 1),
--         (SELECT pi.url FROM product_images pi 
--          WHERE pi.product_id = p.product_id AND pi.variant_id IS NULL AND pi.is_primary = TRUE LIMIT 1)
--     ) AS image_url

-- FROM products p
-- LEFT JOIN categories c ON p.category_id = c.category_id
-- LEFT JOIN product_variants pv ON p.product_id = pv.product_id
-- WHERE p.is_active = TRUE;


-- -- ==================================================
-- -- 3. CART VIEW
-- -- Χρήση: Display user's cart
-- -- Περιλαμβάνει: Cart items με product & variant details, prices, subtotals
-- -- ==================================================
-- CREATE OR REPLACE VIEW v_cart_details AS
-- SELECT 
--     ci.cart_item_id,
--     ci.user_id,
--     ci.quantity,
--     ci.added_at,
--     ci.updated_at,
--     
--     -- Product info
--     ci.product_id,
--     p.name AS product_name,
--     p.gender,
--     
--     -- Variant info
--     ci.variant_id,
--     pv.color,
--     pv.size,
--     pv.sku,
--     pv.stock AS available_stock,
--     
--     -- Pricing
--     p.base_price,
--     pv.price_adjustment,
--     (p.base_price + pv.price_adjustment) AS unit_price,
--     (ci.quantity * (p.base_price + pv.price_adjustment)) AS subtotal,
--     
--     -- Image
--     COALESCE(
--         (SELECT pi.url FROM product_images pi 
--          WHERE pi.variant_id = pv.variant_id AND pi.is_primary = TRUE LIMIT 1),
--         (SELECT pi.url FROM product_images pi 
--          WHERE pi.product_id = p.product_id AND pi.variant_id IS NULL AND pi.is_primary = TRUE LIMIT 1)
--     ) AS image_url,
--     
--     -- Availability check
--     CASE 
--         WHEN pv.stock >= ci.quantity THEN TRUE 
--         ELSE FALSE 
--     END AS is_available,
--     
--     -- Category
--     c.name AS category_name

-- FROM cart_items ci
-- JOIN product_variants pv ON ci.variant_id = pv.variant_id
-- JOIN products p ON ci.product_id = p.product_id
-- LEFT JOIN categories c ON p.category_id = c.category_id;


-- -- ==================================================
-- -- 4. ORDER SUMMARY VIEW
-- -- Χρήση: Order listing για users & admin
-- -- Περιλαμβάνει: Order info με user details, item count
-- -- ==================================================
-- CREATE OR REPLACE VIEW v_order_summary AS
-- SELECT 
--     o.order_id,
--     o.order_date,
--     o.total_amount,
--     o.status,
--     o.payment_method,
--     o.payment_status,
--     o.shipping_address,
--     o.shipping_city,
--     o.shipping_postal_code,
--     o.updated_at,
--     
--     -- User info
--     o.user_id,
--     u.username,
--     u.email,
--     CONCAT(COALESCE(up.first_name, ''), ' ', COALESCE(up.last_name, '')) AS customer_name,
--     up.phone_number,
--     
--     -- Order stats
--     COUNT(od.order_detail_id) AS total_items,
--     SUM(od.quantity) AS total_quantity

-- FROM orders o
-- JOIN users u ON o.user_id = u.user_id
-- LEFT JOIN user_profiles up ON u.user_id = up.user_id
-- LEFT JOIN order_details od ON o.order_id = od.order_id
-- GROUP BY o.order_id, u.user_id, up.user_id;


-- -- ==================================================
-- -- 5. ORDER DETAILS VIEW
-- -- Χρήση: Order detail page
-- -- Περιλαμβάνει: Όλα τα items του order με product info
-- -- ==================================================
-- CREATE OR REPLACE VIEW v_order_full_details AS
-- SELECT 
--     od.order_detail_id,
--     od.order_id,
--     
--     -- Order info
--     o.order_date,
--     o.status AS order_status,
--     o.total_amount AS order_total,
--     o.payment_method,
--     o.payment_status,
--     o.shipping_address,
--     
--     -- User info
--     o.user_id,
--     u.username,
--     u.email,
--     
--     -- Order item details (snapshot data από τη στιγμή της παραγγελίας)
--     od.product_name,
--     od.variant_color,
--     od.variant_size,
--     od.quantity,
--     od.price_per_item,
--     od.subtotal,
--     
--     -- Current product/variant info (για reference, μπορεί να διαφέρει από snapshot)
--     od.product_id,
--     od.variant_id,
--     p.name AS current_product_name,
--     pv.stock AS current_stock,
--     
--     -- Image
--     COALESCE(
--         (SELECT pi.url FROM product_images pi 
--          WHERE pi.variant_id = od.variant_id AND pi.is_primary = TRUE LIMIT 1),
--         (SELECT pi.url FROM product_images pi 
--          WHERE pi.product_id = od.product_id AND pi.variant_id IS NULL AND pi.is_primary = TRUE LIMIT 1)
--     ) AS image_url

-- FROM order_details od
-- JOIN orders o ON od.order_id = o.order_id
-- JOIN users u ON o.user_id = u.user_id
-- LEFT JOIN products p ON od.product_id = p.product_id
-- LEFT JOIN product_variants pv ON od.variant_id = pv.variant_id;


-- -- ==================================================
-- -- 6. WISHLIST VIEW
-- -- Χρήση: Display user's wishlist
-- -- Περιλαμβάνει: Wishlist items με product details (ΟΧΙ variant-specific)
-- -- ==================================================
-- CREATE OR REPLACE VIEW v_wishlist_details AS
-- SELECT 
--     wi.wishlist_item_id,
--     wi.user_id,
--     wi.product_id,
--     wi.added_at,
--     
--     -- Product info
--     p.name AS product_name,
--     p.description,
--     p.base_price,
--     p.gender,
--     
--     -- Category
--     c.name AS category_name,
--     
--     -- Availability (υπολογίζεται από το σύνολο των variants)
--     (SELECT SUM(stock) FROM product_variants WHERE product_id = p.product_id AND is_available = TRUE) AS total_stock,
--     
--     -- Price range
--     (SELECT MIN(base_price + price_adjustment) FROM product_variants pv2 WHERE pv2.product_id = p.product_id) AS min_price,
--     (SELECT MAX(base_price + price_adjustment) FROM product_variants pv2 WHERE pv2.product_id = p.product_id) AS max_price,
--     
--     CASE 
--         WHEN (SELECT SUM(stock) FROM product_variants WHERE product_id = p.product_id AND is_available = TRUE) > 0 
--         THEN TRUE 
--         ELSE FALSE 
--     END AS in_stock,
--     
--     -- Primary image (γενική εικόνα προϊόντος)
--     (SELECT pi.url FROM product_images pi 
--      WHERE pi.product_id = p.product_id AND pi.variant_id IS NULL AND pi.is_primary = TRUE 
--      LIMIT 1) AS image_url

-- FROM wishlist_items wi
-- JOIN products p ON wi.product_id = p.product_id
-- LEFT JOIN categories c ON p.category_id = c.category_id
-- WHERE p.is_active = TRUE;


-- -- ==================================================
-- -- 7. LOW STOCK ALERTS VIEW
-- -- Χρήση: Admin inventory management
-- -- Περιλαμβάνει: Variants με χαμηλό stock (≤ 5)
-- -- ==================================================
-- CREATE OR REPLACE VIEW v_low_stock_alerts AS
-- SELECT 
--     pv.variant_id,
--     pv.sku,
--     pv.stock,
--     pv.color,
--     pv.size,
--     
--     -- Product info
--     p.product_id,
--     p.name AS product_name,
--     p.gender,
--     
--     -- Category
--     c.name AS category_name,
--     
--     -- Price
--     (p.base_price + pv.price_adjustment) AS price,
--     
--     -- Alert level
--     CASE 
--         WHEN pv.stock = 0 THEN 'OUT_OF_STOCK'
--         WHEN pv.stock <= 2 THEN 'CRITICAL'
--         WHEN pv.stock <= 5 THEN 'LOW'
--         ELSE 'OK'
--     END AS stock_status

-- FROM product_variants pv
-- JOIN products p ON pv.product_id = p.product_id
-- LEFT JOIN categories c ON p.category_id = c.category_id
-- WHERE pv.stock <= 5 AND pv.is_available = TRUE AND p.is_active = TRUE
-- ORDER BY pv.stock ASC, p.name;


-- -- ==================================================
-- -- 8. USER ORDER STATS VIEW
-- -- Χρήση: User profile - order history summary & customer segmentation
-- -- Περιλαμβάνει: Aggregated stats για κάθε user
-- -- ==================================================
-- CREATE OR REPLACE VIEW v_user_order_stats AS
-- SELECT 
--     u.user_id,
--     u.username,
--     u.email,
--     CONCAT(COALESCE(up.first_name, ''), ' ', COALESCE(up.last_name, '')) AS full_name,
--     
--     -- Order statistics
--     COUNT(DISTINCT o.order_id) AS total_orders,
--     COALESCE(SUM(o.total_amount), 0) AS total_spent,
--     COALESCE(AVG(o.total_amount), 0) AS avg_order_value,
--     
--     -- Order status breakdown
--     SUM(CASE WHEN o.status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders,
--     SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,
--     SUM(CASE WHEN o.status IN ('pending', 'confirmed', 'processing', 'shipped') THEN 1 ELSE 0 END) AS active_orders,
--     
--     -- Dates
--     MIN(o.order_date) AS first_order_date,
--     MAX(o.order_date) AS last_order_date

-- FROM users u
-- LEFT JOIN user_profiles up ON u.user_id = up.user_id
-- LEFT JOIN orders o ON u.user_id = o.user_id
-- WHERE u.role = 'customer'
-- GROUP BY u.user_id, up.user_id;


-- -- ==================================================
-- -- 9. DAILY SALES REPORT VIEW
-- -- Χρήση: Admin analytics/dashboard
-- -- Περιλαμβάνει: Daily aggregated sales data
-- -- ==================================================
-- CREATE OR REPLACE VIEW v_daily_sales_report AS
-- SELECT 
--     DATE(o.order_date) AS sale_date,
--     
--     -- Order counts
--     COUNT(DISTINCT o.order_id) AS total_orders,
--     COUNT(DISTINCT o.user_id) AS unique_customers,
--     
--     -- Revenue
--     SUM(o.total_amount) AS daily_revenue,
--     AVG(o.total_amount) AS avg_order_value,
--     
--     -- Items
--     SUM(od.quantity) AS total_items_sold,
--     
--     -- Payment methods breakdown
--     SUM(CASE WHEN o.payment_method = 'credit_card' THEN o.total_amount ELSE 0 END) AS credit_card_revenue,
--     SUM(CASE WHEN o.payment_method = 'paypal' THEN o.total_amount ELSE 0 END) AS paypal_revenue,
--     SUM(CASE WHEN o.payment_method = 'cash' THEN o.total_amount ELSE 0 END) AS cash_revenue,
--     
--     -- Status breakdown
--     SUM(CASE WHEN o.status = 'delivered' THEN 1 ELSE 0 END) AS delivered_count,
--     SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_count,
--     SUM(CASE WHEN o.status = 'failed' THEN 1 ELSE 0 END) AS failed_count

-- FROM orders o
-- LEFT JOIN order_details od ON o.order_id = od.order_id
-- GROUP BY DATE(o.order_date)
-- ORDER BY sale_date DESC;

-- ================= Sample INSERTS (UPDATED) =================

-- Users
INSERT INTO users (username, email, password, role) VALUES
('john_doe', 'john@example.com', '$2a$10$hashed_password_1', 'customer'),
('maria_k',  'maria@example.com', '$2a$10$hashed_password_2', 'customer'),
('admin01',  'admin@example.com', '$2a$10$hashed_password_3', 'admin');

-- User Profiles
INSERT INTO user_profiles (user_id, first_name, last_name, address, city, postal_code, phone_number, birthdate) VALUES
(1, 'John', 'Doe', '123 Main St', 'Athens', '10435', '2101234567', '1990-02-15'),
(2, 'Maria', 'Konstantinou', '45 Ermou St', 'Patras', '26221', '2610123456', '1995-11-03'),
(3, 'Admin', 'User', '1 Admin Avenue', 'Thessaloniki', '54622', '2310123456', '1985-05-22');

-- Categories
INSERT INTO categories (name, description) VALUES
('Shoes', 'All types of footwear'),
('Sportswear', 'Clothing and accessories for sports'),
('Accessories', 'Bags, hats, belts and more');

-- Products
INSERT INTO products (name, gender, description, tags, base_price, category_id) VALUES
('Running Shoes X1', 'men', 'Lightweight running shoes for everyday use', 'running,sport', 59.99, 1),
('Leather Boots Pro', 'women', 'Premium leather boots for winter season', 'boots,leather,winter', 129.99, 1),
('Sports T-Shirt', 'women', 'Breathable training t-shirt', 'tshirt,sport', 19.99, 2),
('Gym Backpack', 'unisex', 'Durable sports backpack with multiple compartments', 'backpack,gym', 39.99, 3),
('Baseball Cap', 'kids', 'Adjustable cotton cap', 'cap,accessory', 14.99, 3);

-- Product Variants
INSERT INTO product_variants (product_id, color, size, sku, stock, price_adjustment) VALUES
-- Running Shoes X1 (product_id = 1)
(1, 'Black', '42', 'RS-X1-BLK-42', 5, 0.00),
(1, 'Black', '43', 'RS-X1-BLK-43', 3, 0.00),
(1, 'Black', '44', 'RS-X1-BLK-44', 1, 0.00),
(1, 'Blue', '42', 'RS-X1-BLU-42', 4, 0.00),
(1, 'Blue', '43', 'RS-X1-BLU-43', 6, 0.00),
(1, 'Blue', '44', 'RS-X1-BLU-44', 2, 0.00),
-- Leather Boots Pro (product_id = 2)
(2, 'Brown', '39', 'LB-PRO-BRN-39', 10, 0.00),
(2, 'Brown', '40', 'LB-PRO-BRN-40', 8, 0.00),
(2, 'Brown', '41', 'LB-PRO-BRN-41', 5, 0.00),
(2, 'Black', '39', 'LB-PRO-BLK-39', 7, 10.00),
(2, 'Black', '40', 'LB-PRO-BLK-40', 4, 10.00),
-- Sports T-Shirt (product_id = 3)
(3, 'Red', 'S', 'ST-RED-S', 15, 0.00),
(3, 'Red', 'M', 'ST-RED-M', 20, 0.00),
(3, 'Red', 'L', 'ST-RED-L', 12, 0.00),
(3, 'Blue', 'S', 'ST-BLU-S', 10, 0.00),
(3, 'Blue', 'M', 'ST-BLU-M', 18, 0.00),
(3, 'Blue', 'L', 'ST-BLU-L', 8, 0.00),
-- Gym Backpack (product_id = 4)
(4, 'Black', 'OneSize', 'GB-BLK-OS', 25, 0.00),
(4, 'Navy', 'OneSize', 'GB-NAV-OS', 15, 0.00),
(4, 'Red', 'OneSize', 'GB-RED-OS', 10, 5.00),
-- Baseball Cap (product_id = 5)
(5, 'Red', 'OneSize', 'BC-RED-OS', 30, 0.00),
(5, 'Blue', 'OneSize', 'BC-BLU-OS', 25, 0.00),
(5, 'White', 'OneSize', 'BC-WHT-OS', 20, 0.00);

-- Product Images
INSERT INTO product_images (product_id, variant_id, url, alt_text, position, is_primary) VALUES
-- General product images
(1, NULL, '/images/products/running-shoes-x1-main.jpg', 'Running Shoes X1', 1, TRUE),
(1, NULL, '/images/products/running-shoes-x1-side.jpg', 'Running Shoes X1 Side View', 2, FALSE),
-- Variant-specific images
(1, 1, '/images/products/running-shoes-x1-black.jpg', 'Running Shoes X1 Black', 1, TRUE),
(1, 4, '/images/products/running-shoes-x1-blue.jpg', 'Running Shoes X1 Blue', 1, TRUE),
(2, NULL, '/images/products/boots-pro-main.jpg', 'Leather Boots Pro', 1, TRUE),
(2, 7, '/images/products/boots-pro-brown.jpg', 'Leather Boots Pro Brown', 1, TRUE),
(3, NULL, '/images/products/sports-tshirt-main.jpg', 'Sports T-Shirt', 1, TRUE),
(4, NULL, '/images/products/gym-backpack-main.jpg', 'Gym Backpack', 1, TRUE),
(5, NULL, '/images/products/baseball-cap-main.jpg', 'Baseball Cap', 1, TRUE);

-- Wishlist Items (UPDATED: χωρίς variant_id)
INSERT INTO wishlist_items (user_id, product_id) VALUES
(1, 1),  -- John likes Running Shoes
(1, 3),  -- John likes Sports T-Shirt
(2, 2),  -- Maria likes Leather Boots
(2, 5);  -- Maria likes Baseball Cap

-- Cart Items (UPDATED: με product_id και variant_id)
INSERT INTO cart_items (user_id, variant_id, quantity) VALUES
(1, 1, 2),   -- John: Running Shoes X1, Black 42, qty 2
(1, 19, 1),  -- John: Gym Backpack Black, qty 1
(2, 13, 3),  -- Maria: Sports T-Shirt Red M, qty 3
(3, 7, 1);   -- Admin: Leather Boots Brown 39, qty 1

-- Orders
INSERT INTO orders (user_id, total_amount, status, shipping_address, shipping_city, shipping_postal_code, payment_method, payment_status) VALUES
(1, 159.97, 'pending', '123 Main St', 'Athens', '10435', 'credit_card', 'pending'),
(2, 59.97, 'delivered', '45 Ermou St', 'Patras', '26221', 'cash', 'completed'),
(3, 159.97, 'processing', '1 Admin Avenue', 'Thessaloniki', '54622', 'paypal', 'completed');

-- Order Details (UPDATED: με product_id και variant_id)
INSERT INTO order_details (order_id, variant_id, quantity, price_per_item) VALUES
-- Order 1 (John's order)
(1, 1, 2, 59.99),
(1, 19, 1, 39.99),
-- Order 2 (Maria's delivered order)
(2, 13, 3, 19.99),
-- Order 3 (Admin's processing order)
(3, 7, 1, 129.99),
(3, 23, 2, 14.99);

SELECT * FROM v_product_catalog;