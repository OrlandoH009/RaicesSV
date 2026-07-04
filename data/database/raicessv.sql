Create Database IF NOT EXISTS raicessv;
USE raicessv;

CREATE TABLE IF NOT EXISTS rols(
    id_rol int auto_increment primary key,
    rol varchar (50) not null
);

Create Table IF NOT EXISTS users(
    id_user int auto_increment primary key,
    id_rol int not null,
    name varchar(125) not null,
    email varchar(125) not null unique,
    password varchar(125) null,
    FOREIGN KEY (id_rol) REFERENCES rols(id_rol)
);

Create Table IF NOT EXISTS tests(
    id_test int auto_increment primary key,
    title varchar(125) not null,
    description text not null
);

Create Table IF NOT EXISTS properties(
    id_property int auto_increment primary key,
    title varchar(125) not null,
    description text not null,
    location varchar(125) not null,
    image varchar(125) not null
);

Create Table IF NOT EXISTS coments(
    id_coment int auto_increment primary key,
    id_user int not null,
    id_property int not null,
    coment text not null,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_property) REFERENCES properties(id_property)
);

Create Table IF NOT EXISTS scores(
    id_score int auto_increment primary key,
    id_user int not null,
    id_test int not null,
    score int not null,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_test) REFERENCES tests(id_test)
);

Insert into rols(rol) values('Admin');
Insert into rols(rol) values('Usuario');
Insert into users(name, email, password, id_rol) values('Admin', 'admin@example.com', 'admin123', 1);