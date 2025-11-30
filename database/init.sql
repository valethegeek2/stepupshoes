-- Clean slate: remove and recreate the testing database
DROP DATABASE IF EXISTS eshop;
CREATE DATABASE eshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Drop and recreate the user (safe for re-init)
DROP USER IF EXISTS '${MYSQL_USER}'@'%';
CREATE USER '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON eshop.* TO '${MYSQL_USER}'@'%';
FLUSH PRIVILEGES;


