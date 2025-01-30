CREATE DATABASE inventorydb;

CREATE TABLE IF NOT EXISTS inventories(
    id SERIAL PRIMARY KEY, 
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,   
    units INT NOT NULL,
    batch_number INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) UNIQUE NOT NULL, 
    sku_id VARCHAR(100) UNIQUE NOT NULL,
    packing VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vendors(
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) UNIQUE NOT NULL,  
    company_address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(100)  UNIQUE NOT NULL,
    email VARCHAR(100)  UNIQUE NOT NULL,
    gst_number VARCHAR(255),               
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    vendor_id INT REFERENCES vendors(id) ON DELETE CASCADE,
    total_price DECIMAL(10, 2) NOT NULL,   
    total_units INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_products(
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,   
    units INT NOT NULL,
    batch_number INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id,product_id)
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
)

CREATE TABLE IF NOT EXISTS invoices (
    order_id INT PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
    invoice_number_pre VARCHAR(100) NOT NULL,
    invoice_number_mid VARCHAR(100) NOT NULL,
    invoice_number INT NOT NULL 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- want invoice number starting TG25101 and want to reset every april or new financial year
-- 25 is the year so we manage it in the route




