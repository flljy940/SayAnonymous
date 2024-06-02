-- populate.sql
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password) VALUES ('Alice', 'alice@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('Bob', 'bob@example.com', 'password2');
INSERT INTO users (name, email, password) VALUES ('Charlie', 'charlie@example.com', 'password3');
