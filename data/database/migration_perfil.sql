-- Migración: soporte de perfil editable (descripción + foto de perfil)
-- Ejecutar sobre la base de datos raicessv ya existente.

USE raicessv;

ALTER TABLE users
    ADD COLUMN description VARCHAR(300) NULL,
    ADD COLUMN avatar_url VARCHAR(255) NULL,
    ADD COLUMN avatar_source ENUM('local', 'google') NULL,
    ADD COLUMN google_avatar_url VARCHAR(255) NULL;

-- Migración: recuperación de contraseña ("olvidé mi contraseña")
-- Guarda solo el HASH del token (nunca el token en claro) y su expiración.
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