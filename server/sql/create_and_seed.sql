#MySQL example for ref only, not to be used in this App

drop database HCA;
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

INSERT INTO Users (USER_NAME, PASSWORD, EMAIL, IS_ADMIN) VALUES ('Admin', 'password', 'admin@test.com', 1);
INSERT INTO Users (USER_NAME, PASSWORD, EMAIL, IS_ADMIN) VALUES ('rsargolini', 'password', 'rsargo@gmail.com', 0);
INSERT INTO Users (USER_NAME, PASSWORD, EMAIL, IS_ADMIN) VALUES ('bsmith', 'password', 'bsmith@aol.com', 0);
INSERT INTO Users (USER_NAME, PASSWORD, EMAIL, IS_ADMIN) VALUES ('wtaylor', 'password', 'will.taylor@sbcglobal.net', 0);

#select * from users;
#select * from users where id = 1;
#select * from users where is_admin = 1;
select * from users where is_admin != 1;