-- ====================================================
-- 1) Categories
-- Each product belongs to a category.
-- Add more categories later by copying the INSERT line.
-- ====================================================
INSERT INTO categories (name, description) VALUES
('Shoes', 'All types of running, casual, and sports shoes'),
('Clothing', 'Sportswear: t-shirts, jackets, hoodies'),
('Accessories', 'Bags, socks, hats, sports accessories');

-- ====================================================
-- 2) Products
-- Base product info. Variants are separate in product_variants table.
-- ====================================================
INSERT INTO products (name, description, tags, base_price, gender, category_id, is_active) VALUES
('Nike Air Zoom', 'Lightweight running shoes', 'nike,running,zoom', 120, 'MEN', 1, TRUE),
('Adidas Ultraboost', 'Premium running shoes with comfort', 'adidas,running,boost', 150, 'MEN', 1, TRUE),
('Puma Training T-shirt', 'Breathable training tee', 'puma,training,shirt', 40, 'UNISEX', 2, TRUE),
('Under Armour Hoodie', 'Warm hoodie for workouts', 'underarmour,hoodie', 70, 'WOMEN', 2, TRUE),
('Under Armor Xtrail', 'UA Shoes for running', 'underarmour,shoes', 89.99, 'MEN', 1, TRUE),
('Sport Socks', 'Pack of 3 ankle socks', 'socks,accessory', 15, 'UNISEX', 3, TRUE),
('Special TIme Limited Socks', 'Pack of 3 ankle socks', 'socks,accessory', 10, 'UNISEX', 3, FALSE);

-- ====================================================
-- 3) Product Variants
-- Each variant has color, size, stock, and price adjustment.
-- Use product_id from products table.
-- ====================================================
INSERT INTO product_variants (product_id, color, size, stock, price_adjustment, is_available) VALUES
(1, 'Black', '42', 10, 0, TRUE),
(1, 'White', '43', 8, 0, TRUE),
(2, 'Black', '42', 5, 10, TRUE),   -- 10 added to base price
(2, 'White', '44', 3, 15, TRUE),
(3, 'Blue', 'M', 20, 0, TRUE),
(3, 'Red', 'L', 15, 0, TRUE),
(4, 'Grey', 'S', 12, 0, TRUE),
(4, 'Black', 'M', 5, 0, TRUE),
(5, 'Lime/Blue', '42', 4, 10, TRUE),
(6, 'White', 'OneSize', 50, 0, TRUE);

-- ====================================================
-- 4) Users
-- Passwords must be encoded with BCrypt if using Spring Security
-- Example: $2a$10$... is a BCrypt hash of '1234'
-- ====================================================
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@sports.com', '$2a$10$D9F2xT8pQZXc2.3h1nIhS.6mZpH8kGz1cqlMfxZo4Qph3Ujz8y3/C', 'ADMIN'),
('customer1', 'cust1@sports.com', '$2a$10$D9F2xT8pQZXc2.3h1nIhS.6mZpH8kGz1cqlMfxZo4Qph3Ujz8y3/C', 'CUSTOMER');

-- ====================================================
-- 5) How to add more data
-- To add a new category:
-- INSERT INTO categories (name, description) VALUES ('New Category', 'Description');
--
-- To add a new product:
-- INSERT INTO products (name, description, tags, base_price, gender, category_id, is_active) VALUES (...);
--
-- To add a new product variant:
-- INSERT INTO product_variants (product_id, color, size, stock, price_adjustment, is_available) VALUES (...);
--
-- To add a new user:
-- INSERT INTO users (username, email, password, role) VALUES (...);
-- Remember to encode the password if Spring Security is enabled
