CREATE DATABASE IF NOT EXISTS raicessv;
USE raicessv;

CREATE TABLE IF NOT EXISTS rols(
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_status(
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL DEFAULT 2,
    id_status INT NOT NULL DEFAULT 1,
    name VARCHAR(125) NOT NULL,
    email VARCHAR(125) NOT NULL UNIQUE,
    password VARCHAR(125) NULL,
    google_id VARCHAR(191) UNIQUE NULL,
    description VARCHAR(300) NULL,
    avatar_url VARCHAR(255) NULL,
    avatar_source ENUM('local', 'google') NULL,
    google_avatar_url VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES rols(id_rol),
    FOREIGN KEY (id_status) REFERENCES user_status(id_status)
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

INSERT IGNORE INTO rols(rol) VALUES ('Fundador');
INSERT IGNORE INTO rols(rol) VALUES ('Admin');
INSERT IGNORE INTO rols(rol) VALUES ('Usuario');
INSERT IGNORE INTO user_status(status) VALUES ('Activo');
INSERT IGNORE INTO user_status(status) VALUES ('Suspendido');
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Admin', 'admin@example.com', 'admin123', (SELECT id_rol FROM rols WHERE rol = 'Fundador'));
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Orlanditox', 'orlan.estupinian@gmail.com', '12345678', (SELECT id_rol FROM rols WHERE rol = 'Admin'));
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Ale', 'jenialecastro0811@gmail.com', '87654321', (SELECT id_rol FROM rols WHERE rol = 'Admin'));
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Tonatiuh', 'tona@gmail.com', '12345678', (SELECT id_rol FROM rols WHERE rol = 'Admin'));

INSERT INTO publications (id_user, title, description, location, image) VALUES
(1, 'Ruinas de Tazumal', 'Una vista espectacular de las pirámides antiguas al atardecer. El lugar es perfecto para aprender sobre la historia prehispánica de El Salvador.', 'Tazumal', 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=500&h=350&fit=crop'),
(1, 'Cascada en Joya de Cerén', 'Una cascada hermosa en medio de la naturaleza salvadoreña. Ideal para una caminata refrescante y conectar con la naturaleza.', 'Joya de Cerén', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop'),
(1, 'Atardecer en Salvador del Mundo', 'Vistas panorámicas de San Salvador desde la cima del cerro. Un lugar perfecto para contemplar la ciudad y fotografiar el atardecer.', 'Salvador del Mundo', 'https://images.unsplash.com/photo-1469022563149-aa64dbd37cf0?w=500&h=350&fit=crop'),
(1, 'Pueblo Mágico de Suchitoto', 'Las calles coloniales de Suchitoto son un viaje al pasado. Casas antiguas, arte y cultura en cada rincón.', 'Suchitoto', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=350&fit=crop'),
(1, 'Catedral Metropolitana', 'La arquitectura religiosa más importante de El Salvador. Un lugar de paz y contemplación en el corazón de San Salvador.', 'Catedral Metropolitana', 'https://images.unsplash.com/photo-1485945371519-b21cc028cb2f?w=500&h=350&fit=crop'),
(1, 'Bosque El Imposible', 'Una reserva natural con una biodiversidad increíble. Caminos entre árboles centenarios y aire puro de la naturaleza.', 'Bosque El Imposible', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop'),
(1, 'Salas del Museo Nacional de Antropología', 'Recorrido por las salas del MUNA, con piezas arqueológicas y etnográficas que cuentan la historia de El Salvador.', 'MUNA', 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=500&h=350&fit=crop'),
(1, 'Acrópolis de las Ruinas de San Andrés', 'La gran plaza ceremonial maya de San Andrés, rodeada de vegetación y con el volcán de fondo.', 'Ruinas de San Andrés', 'https://images.unsplash.com/photo-1518537774776-6d0c9de1efba?w=500&h=350&fit=crop'),
(1, 'Taller de añil en Casa Blanca', 'Aprendiendo el proceso artesanal del teñido con añil en el taller demostrativo de Casa Blanca, Chalchuapa.', 'Casa Blanca', 'https://images.unsplash.com/photo-1528283260755-3a97f5e88af1?w=500&h=350&fit=crop'),
(1, 'Salones del Palacio Nacional', 'Los salones Azul, Rojo y Amarillo del Palacio Nacional, con su mármol italiano y detalles neoclásicos.', 'Palacio Nacional', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=500&h=350&fit=crop'),
(1, 'Noche de gala en el Teatro Nacional', 'El teatro más antiguo de Centroamérica, con sus balcones dorados y terciopelo rojo, listo para una función.', 'Teatro Nacional', 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=500&h=350&fit=crop'),
(1, 'Vitrales de la Iglesia El Rosario', 'El arcoíris de luz que atraviesa los vitrales de la Iglesia El Rosario en el Centro Histórico de San Salvador.', 'Iglesia El Rosario', 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=500&h=350&fit=crop'),
(1, 'Bajada del Salvador en las Fiestas Agostinas', 'Acompañé la procesión del Divino Salvador del Mundo entre fuegos artificiales y miles de personas. Una experiencia que eriza la piel.', 'Fiestas Agostinas', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&h=350&fit=crop'),
(1, 'Alfombras de aserrín en Semana Santa', 'Ver a la comunidad crear alfombras de flores y aserrín antes de la procesión fue como presenciar arte efímero en vivo.', 'Semana Santa Nacional', 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=500&h=350&fit=crop'),
(1, 'Desfile del 15 de Septiembre', 'Las palillonas y bandas de guerra desfilando con los colores patrios fue puro orgullo salvadoreño.', 'Día de la Independencia', 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=500&h=350&fit=crop'),
(1, 'Ofrendas en el Día de los Difuntos', 'Ayudamos a limpiar y adornar la tumba de mi abuela con flores; el cementerio se llenó de velas y recuerdos.', 'Día de los Difuntos', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=350&fit=crop'),
(1, 'Posadas navideñas en familia', 'Rezamos, rompimos piñata y compartimos ponche en la posada de mi cuadra. Así se vive la Navidad en El Salvador.', 'Navidad y Posadas', 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=500&h=350&fit=crop'),
(1, 'Feria patronal en honor a Santa Ana', 'Las Fiestas Julias llenaron el centro de Santa Ana de música, comida y devoción religiosa.', 'Fiestas Julias', 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=500&h=350&fit=crop'),
(1, 'Comparsas del Carnaval de San Miguel', 'Las orquestas en vivo y los disfraces del carnaval más grande de Centroamérica no tienen comparación.', 'Gran Carnaval de San Miguel', 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&h=350&fit=crop'),
(1, 'Arte urbano en el Festival de Suchitoto', 'Artistas de toda Latinoamérica llenaron las calles coloniales de música y exposiciones.', 'Festival de Suchitoto', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=350&fit=crop'),
(1, 'Personajes de leyenda en la Calabiuza', 'Ver a la Siguanaba y al Cadejo cobrar vida en el desfile nocturno de Tonacatepeque fue inolvidable.', 'Día de la Calabiuza', 'https://images.unsplash.com/photo-1509557965043-3ecbca6ad6cc?w=500&h=350&fit=crop'),
(1, 'Miles de faroles en Ataco', 'Concepción de Ataco iluminada por completo con faroles artesanales: el pueblo entero brilla esa noche.', 'Día de los Farolitos', 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=500&h=350&fit=crop'),
(1, 'Taller de añil en el Festival del Añil', 'Aprendí de primera mano las técnicas prehispánicas de teñido en el Festival del Añil de Suchitoto.', 'Festival del Añil', 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=500&h=350&fit=crop'),
(1, 'Figuras de barro en Ilobasco', 'Visitamos los talleres de Ilobasco durante el Festival del Barro y vimos crear las famosas miniaturas.', 'Festival del Barro', 'https://images.unsplash.com/photo-1565193566173-7a0af771d71a?w=500&h=350&fit=crop'),
(1, 'Procesión de las Palmas en Panchimalco', 'El Festival de las Flores y Palmas llenó las calles de Panchimalco de color al inicio de la época lluviosa.', 'Festival de las Flores y Palmas', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=350&fit=crop'),
(1, 'Chicharrón en Santa Tecla', 'El Festival Internacional del Chicharrón reunió a cocineros de todo el país en una fiesta de sabores.', 'Festival Internacional del Chicharrón', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=350&fit=crop'),
(1, 'Dulces de jocote en el Cerro Verde', 'El Festival del Jocote Corona en Santa Ana ofrece desde jocotes en miel hasta postres artesanales.', 'Festival del Jocote Corona', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=350&fit=crop');