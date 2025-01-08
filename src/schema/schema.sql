CREATE DATABASE inventoryDb;

CREATE TABLE IF NOT EXISTS products{
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) UNIQUE NOT NULL, 
    quantity VARCHAR(255) NOT NULL, 
    units INT,
    code VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};

CREATE TABLE IF NOT EXISTS company{
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) UNIQUE NOT NULL,  
    company_address VARCHAR(255) NOT NULL,
    phone_number INT UNIQUE NOT NULL,
    gst_number VARCHAR(255),               
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};

CREATE TABLE IF NOT EXISTS orders{
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES company(id) ON DELETE CASCADE,
    total_price DECIMAL(10, 2) NOT NULL,   
    total_units INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};

CREATE TABLE IF NOT EXISTS order_products{
    order_id INT REFERENCES order(id) ON DELETE CASCADE,
    product_id INT REFERENCES product(id) ON DELETE CASCADE
    price DECIMAL(10, 2) NOT NULL,   
    units INT NOT NULL,
    batch_number INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id,product_id)
};

CREATE TABLE IF NOT EXISTS users{
    id SERIAL PRIMARY KEY
    username VARCHAR(100) UNIQUE NOT NULL
    user_password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
}


