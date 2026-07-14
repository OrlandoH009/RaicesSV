-- Migración: soporte de perfil editable (descripción + foto de perfil)
-- Ejecutar sobre la base de datos raicessv ya existente.

USE raicessv;

ALTER TABLE users
    ADD COLUMN description VARCHAR(300) NULL,
    ADD COLUMN avatar_url VARCHAR(255) NULL,
    ADD COLUMN avatar_source ENUM('local', 'google') NULL,
    ADD COLUMN google_avatar_url VARCHAR(255) NULL;