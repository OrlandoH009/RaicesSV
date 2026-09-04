CREATE DATABASE IF NOT EXISTS raicessv;
USE raicessv;

CREATE TABLE IF NOT EXISTS rols(
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_status(
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

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
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS properties(
    id_property INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(125) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(125) NOT NULL,
    image VARCHAR(125) NOT NULL
);


CREATE TABLE IF NOT EXISTS scores(
    id_score INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    score INT NOT NULL,
    game_name VARCHAR(125) NOT NULL,
    game_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS publication_likes(
    id_like INT AUTO_INCREMENT PRIMARY KEY,
    id_publication INT NOT NULL,
    id_user INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_publication_user (id_publication, id_user),
    FOREIGN KEY (id_publication) REFERENCES publications(id_publication) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
) ENGINE=InnoDB;

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

CREATE TABLE IF NOT EXISTS admin_invitations (
    id_invitation INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    invited_by INT NOT NULL,
    token_hash CHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (invited_by) REFERENCES users(id_user) ON DELETE CASCADE,
    INDEX idx_admin_invitations_token_hash (token_hash),
    INDEX idx_admin_invitations_user (id_user)
);

CREATE TABLE IF NOT EXISTS user_suspensions(
    id_suspension INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    suspended_by INT NOT NULL,
    reason VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (suspended_by) REFERENCES users(id_user) ON DELETE CASCADE,
    INDEX idx_user_suspensions_user (id_user)
);

CREATE TABLE IF NOT EXISTS appeals (
    id_appeal INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NULL,
    email VARCHAR(125) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    is_valid BOOLEAN NOT NULL DEFAULT TRUE,
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    INDEX idx_appeals_user (id_user),
    INDEX idx_appeals_reviewed (reviewed_at)
);

CREATE TABLE IF NOT EXISTS coments(
    id_coment INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_publication INT NOT NULL,
    coment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_flagged TINYINT(1) NOT NULL DEFAULT 0,
    flag_reason VARCHAR(255) NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_publication) REFERENCES publications(id_publication) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT IGNORE INTO rols(rol) VALUES ('Fundador');
INSERT IGNORE INTO rols(rol) VALUES ('Admin');
INSERT IGNORE INTO rols(rol) VALUES ('Usuario');
INSERT IGNORE INTO user_status(status) VALUES ('Activo');
INSERT IGNORE INTO user_status(status) VALUES ('Suspendido');
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Admin', 'admin@example.com', 'admin123', (SELECT id_rol FROM rols WHERE rol = 'Fundador'));
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Orlanditox', 'orlan.estupinian@gmail.com', '12345678', (SELECT id_rol FROM rols WHERE rol = 'Admin'));
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Ale', 'jenialecastro0811@gmail.com', '87654321', (SELECT id_rol FROM rols WHERE rol = 'Admin'));
INSERT IGNORE INTO users(name, email, password, id_rol) VALUES ('Tonatiuh', 'tona@gmail.com', '12345678', (SELECT id_rol FROM rols WHERE rol = 'Admin'));
INSERT IGNORE INTO users(name, email, google_id, avatar_url, avatar_source, google_avatar_url, id_rol) VALUES ('Ricardo Tonatiuh Iraheta Turcios', 'ricagamer125@gmail.com', '116158401373053460070', 'https://lh3.googleusercontent.com/a/ACg8ocK0zuXg4Kbf9D9vZzCrQhvQ9dUzJmJ0jl9gUD6VhgiKpuMh8vsF=s96-c', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocK0zuXg4Kbf9D9vZzCrQhvQ9dUzJmJ0jl9gUD6VhgiKpuMh8vsF=s96-c', (SELECT id_rol FROM rols WHERE rol = 'Usuario'));
INSERT IGNORE INTO users(name, email, google_id, avatar_url, avatar_source, google_avatar_url, id_rol) VALUES ('Ricardo Tonatiuh Iraheta Turcios', 'richtonatiuh@gmail.com', '115264601561077680903', 'https://lh3.googleusercontent.com/a/ACg8ocIkruzdKL1qVONVt_8nOsflqhTo9NTX8D0kh3L62VPoiR8XdBY=s96-c', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocIkruzdKL1qVONVt_8nOsflqhTo9NTX8D0kh3L62VPoiR8XdBY=s96-c', (SELECT id_rol FROM rols WHERE rol = 'Usuario'));
INSERT IGNORE INTO users(name, email, google_id, avatar_url, avatar_source, google_avatar_url, id_rol) VALUES ('Salvadorean Roots', 'raicessv467@gmail.com', '109303383231621038429', 'https://lh3.googleusercontent.com/a/ACg8ocL0i7kN5FDjKU7zauRGp1wFlMJlaNtQo2uQkLiJ5TytmYQpqcs=s96-c', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocL0i7kN5FDjKU7zauRGp1wFlMJlaNtQo2uQkLiJ5TytmYQpqcs=s96-c', (SELECT id_rol FROM rols WHERE rol = 'Usuario'));
INSERT IGNORE INTO users(name, email, google_id, avatar_url, avatar_source, google_avatar_url, id_rol) VALUES ('Orlando Efraín Hernández Estupinián', 'estudiante20150279@cdb.edu.sv', '117134165532868895796', 'https://lh3.googleusercontent.com/a/ACg8ocIy1hZcdh5ipRMyOEGWjHLhgofiXv31UMcMjzDL0iy8DtqD5Ire=s96-c', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocIy1hZcdh5ipRMyOEGWjHLhgofiXv31UMcMjzDL0iy8DtqD5Ire=s96-c', (SELECT id_rol FROM rols WHERE rol = 'Usuario'));
INSERT IGNORE INTO users(name, email, google_id, avatar_url, avatar_source, google_avatar_url, id_rol) VALUES ('Alejandra Castro', 'jenialecastro@gmail.com', '107345323045672547599', 'https://lh3.googleusercontent.com/a/ACg8ocKlMEWqztMtue7JD5oVAE0NTaW2mvh8r-P4ltnzDElTSxAh5g=s96-c', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocKlMEWqztMtue7JD5oVAE0NTaW2mvh8r-P4ltnzDElTSxAh5g=s96-c', (SELECT id_rol FROM rols WHERE rol = 'Usuario'));
INSERT IGNORE INTO users(name, email, google_id, avatar_url, avatar_source, google_avatar_url, id_rol) VALUES ('Valentina Castro', 'valecastromejia0213@gmail.com', '102104926468755704954', 'https://lh3.googleusercontent.com/a/ACg8ocKEXfIc6UxynWu_GCVkEYEtbtNUqepj_ki4wSPwjetuFy7oxZA=s96-c', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocKEXfIc6UxynWu_GCVkEYEtbtNUqepj_ki4wSPwjetuFy7oxZA=s96-c', (SELECT id_rol FROM rols WHERE rol = 'Usuario'));
INSERT IGNORE INTO users(name, email, google_id, avatar_url, avatar_source, google_avatar_url, id_rol) VALUES ('Jenifer Alejandra Castro Mejia', 'jeniferalejandracastromejia@gmail.com', '104529540422195394743', 'https://lh3.googleusercontent.com/a/ACg8ocJhk0xcM70cRbVvLA4ynlxBeSRPSe0vUHPi3To4C6dXfXHQjw=s96-c', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocJhk0xcM70cRbVvLA4ynlxBeSRPSe0vUHPi3To4C6dXfXHQjw=s96-c', (SELECT id_rol FROM rols WHERE rol = 'Usuario'));

INSERT INTO publications (id_user, title, description, location, image) VALUES
(9, 'Ruinas de Tazumal', 'Una vista espectacular de las pirámides antiguas al atardecer. El lugar es perfecto para aprender sobre la historia prehispánica de El Salvador.', 'Tazumal', 'https://upload.wikimedia.org/wikipedia/commons/0/00/Tazumal_1.JPG'),
(8, 'Cascada en Joya de Cerén', 'Un vistazo único a la vida cotidiana maya, congelada en el tiempo por la ceniza del volcán Loma Caldera hace más de 1400 años. Conocido como la "Pompeya de América", este sitio arqueológico permite recorrer casas, cultivos y objetos tal como quedaron en el momento de la erupción.', 'Joya de Cerén', '/assets/media/sitios/Joya Ceren.jpg'),
(9, 'Atardecer en Salvador del Mundo', 'Vistas panorámicas de San Salvador desde la cima del cerro. Un lugar perfecto para contemplar la ciudad y fotografiar el atardecer.', 'Salvador del Mundo', 'https://upload.wikimedia.org/wikipedia/commons/d/db/El_Salvador_del_Mundo_02.JPG'),
(7, 'Pueblo Mágico de Suchitoto', 'Las calles coloniales de Suchitoto son un viaje al pasado. Casas antiguas, arte y cultura en cada rincón.', 'Suchitoto', 'https://upload.wikimedia.org/wikipedia/commons/6/69/Suchitoto%2C_El_Salvador_-_panoramio_%2874%29.jpg'),
(10, 'Catedral Metropolitana', 'La arquitectura religiosa más importante de El Salvador. Un lugar de paz y contemplación en el corazón de San Salvador.', 'Catedral Metropolitana', 'https://upload.wikimedia.org/wikipedia/commons/3/37/Catedral_Metropolitana_de_San_Salvador.png'),
(5, 'Bosque El Imposible', 'Una reserva natural con una biodiversidad increíble. Caminos entre árboles centenarios y aire puro de la naturaleza.', 'Bosque El Imposible', 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Mirador_Reserva_Natural_El_Imposible.JPG'),
(11, 'Salas del Museo Nacional de Antropología', 'Recorrido por las salas del MUNA, con piezas arqueológicas y etnográficas que cuentan la historia de El Salvador.', 'MUNA', '/assets/media/sitios/MUNA.webp'),
(11, 'Acrópolis de las Ruinas de San Andrés', 'La gran plaza ceremonial maya de San Andrés, rodeada de vegetación y con el volcán de fondo.', 'Ruinas de San Andrés', '/assets/media/sitios/san-andres.jpg'),
(9, 'Taller de añil en Casa Blanca', 'Aprendiendo el proceso artesanal del teñido con añil en el taller demostrativo de Casa Blanca, Chalchuapa.', 'Casa Blanca', '/assets/media/sitios/casablanca.jpg'),
(8, 'Salones del Palacio Nacional', 'Los salones Azul, Rojo y Amarillo del Palacio Nacional, con su mármol italiano y detalles neoclásicos.', 'Palacio Nacional', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Palacio_Nacional_de_El_Salvador_at_night.jpg'),
(5, 'Noche de gala en el Teatro Nacional', 'El teatro más antiguo de Centroamérica, con sus balcones dorados y terciopelo rojo, listo para una función.', 'Teatro Nacional', 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Teatro_Nacional_de_San_Salvador.JPG'),
(8, 'Vitrales de la Iglesia El Rosario', 'El arcoíris de luz que atraviesa los vitrales de la Iglesia El Rosario en el Centro Histórico de San Salvador.', 'Iglesia El Rosario', '/assets/media/sitios/iglesia-rosario.jpg'),
(10, 'Bajada del Salvador en las Fiestas Agostinas', 'Acompañé la procesión del Divino Salvador del Mundo entre fuegos artificiales y miles de personas. Una experiencia que eriza la piel.', 'Fiestas Agostinas', '/assets/media/sitios/salvador-mundo.jpg'),
(5, 'Alfombras de aserrín en Semana Santa', 'Ver a la comunidad crear alfombras de flores y aserrín antes de la procesión fue como presenciar arte efímero en vivo.', 'Semana Santa Nacional', '/assets/media/eventos/semana-santa.jpg'),
(11, 'Desfile del 15 de Septiembre', 'Las palillonas y bandas de guerra desfilando con los colores patrios fue puro orgullo salvadoreño.', 'Día de la Independencia', '/assets/media/eventos/independencia.webp'),
(7, 'Ofrendas en el Día de los Difuntos', 'Ayudamos a limpiar y adornar la tumba de mi abuela con flores; el cementerio se llenó de velas y recuerdos.', 'Día de los Difuntos', '/assets/media/eventos/difuntos.webp'),
(6, 'Posadas navideñas en familia', 'Rezamos, rompimos piñata y compartimos ponche en la posada de mi cuadra. Así se vive la Navidad en El Salvador.', 'Navidad y Posadas', '/assets/media/eventos/navidad.jpg'),
(8, 'Feria patronal en honor a Santa Ana', 'Las Fiestas Julias llenaron el centro de Santa Ana de música, comida y devoción religiosa.', 'Fiestas Julias', '/assets/media/eventos/julias.jpg'),
(11, 'Comparsas del Carnaval de San Miguel', 'Las orquestas en vivo y los disfraces del carnaval más grande de Centroamérica no tienen comparación.', 'Gran Carnaval de San Miguel', '/assets/media/eventos/carnaval.jpg'),
(8, 'Arte urbano en el Festival de Suchitoto', 'Artistas de toda Latinoamérica llenaron las calles coloniales de música y exposiciones.', 'Festival de Suchitoto', '/assets/media/sitios/Suchitoto.webp'),
(11, 'Personajes de leyenda en la Calabiuza', 'Ver a la Siguanaba y al Cadejo cobrar vida en el desfile nocturno de Tonacatepeque fue inolvidable.', 'Día de la Calabiuza', '/assets/media/eventos/calabiuza.jpg'),
(5, 'Miles de faroles en Ataco', 'Concepción de Ataco iluminada por completo con faroles artesanales: el pueblo entero brilla esa noche.', 'Día de los Farolitos', '/assets/media/eventos/farolitos.jpg'),
(6, 'Taller de añil en el Festival del Añil', 'Aprendí de primera mano las técnicas prehispánicas de teñido en el Festival del Añil de Suchitoto.', 'Festival del Añil', '/assets/media/eventos/anil.jpg'),
(8, 'Figuras de barro en Ilobasco', 'Visitamos los talleres de Ilobasco durante el Festival del Barro y vimos crear las famosas miniaturas.', 'Festival del Barro', '/assets/media/eventos/barro.jpg'),
(9, 'Procesión de las Palmas en Panchimalco', 'El Festival de las Flores y Palmas llenó las calles de Panchimalco de color al inicio de la época lluviosa.', 'Festival de las Flores y Palmas', '/assets/media/eventos/flores-palmas.jpg'),
(7, 'Chicharrón en Santa Tecla', 'El Festival Internacional del Chicharrón reunió a cocineros de todo el país en una fiesta de sabores.', 'Festival Internacional del Chicharrón', '/assets/media/eventos/chicharron.jpg'),
(5, 'Dulces de jocote en el Cerro Verde', 'El Festival del Jocote Corona en Santa Ana ofrece desde jocotes en miel hasta postres artesanales.', 'Festival del Jocote Corona', '/assets/media/eventos/jocote.jpeg');