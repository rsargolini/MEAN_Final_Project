create database HCA;
use HCA;

create table USERS (
	ID		 	int(10) NOT NULL AUTO_INCREMENT, 
	USER_NAME 	varchar(255) NOT NULL, 
	PASSWORD	varchar(255) NOT NULL,
	EMAIL 		varchar(255) NOT NULL,
	IS_ADMIN	smallint(1) NOT NULL DEFAULT 0,
	createdAt  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE		UQ_USER_1 (USER_NAME),
	PRIMARY KEY(ID)
);

INSERT INTO Users (user_name, password, email, is_admin) VALUES ('Admin', 'password', 'admin@test.com', 1);

select * from users;