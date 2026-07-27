CREATE DATABASE IF NOT EXISTS raicessv;
USE raicessv;

CREATE TABLE IF NOT EXISTS rols(
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL DEFAULT 2,
    name VARCHAR(125) NOT NULL,
    email VARCHAR(125) NOT NULL UNIQUE,
    password VARCHAR(125) NULL,
    google_id VARCHAR(191) UNIQUE NULL,
    description VARCHAR(300) NULL,
    avatar_url VARCHAR(255) NULL,
    avatar_source ENUM('local', 'google') NULL,
    google_avatar_url VARCHAR(255) NULL,
    FOREIGN KEY (id_rol) REFERENCES rols(id_rol)
);

CREATE TABLE IF NOT EXISTS properties(
    id_property INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(125) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(125) NOT NULL,
    image VARCHAR(125) NOT NULL
);

CREATE TABLE IF NOT EXISTS coments(
    id_coment INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_property INT NOT NULL,
    coment TEXT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_property) REFERENCES properties(id_property)
);

CREATE TABLE IF NOT EXISTS scores(
    id_score INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_test INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE IF NOT EXISTS publications(
    id_publication INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    title VARCHAR(125) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(125) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_resets (
    id_reset INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    token_hash CHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    INDEX idx_password_resets_token_hash (token_hash),
    INDEX idx_password_resets_user (id_user)
);

INSERT IGNORE INTO rols(rol) VALUES ('Admin');
INSERT IGNORE INTO rols(rol) VALUES ('Usuario');
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Admin', 'admin@example.com', 'admin123', 1);