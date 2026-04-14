Create Database raicessv IF NOT EXISTS;
USE raicessv;

Create Table IF NOT EXISTS users(
    id_user int auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null
);

Create Table IF NOT EXISTS properties(
    id_property int auto_increment primary key,
    title varchar(255) not null,
    description text not null,
    location varchar(255) not null,
    image varchar(255) not null
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

Create Table IF NOT EXISTS tests(
    id_test int auto_increment primary key,
    title varchar(255) not null,
    description text not null
);