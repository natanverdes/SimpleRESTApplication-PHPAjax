CREATE DATABASE simple_rest_administration;
USE simple_rest_administration;

CREATE TABLE sra_user
(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(255),
	email varchar(255),
	DNI varchar(255)
);