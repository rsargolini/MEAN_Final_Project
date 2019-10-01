# Server

## Create PostgreSQL User and DB
+ username: hca
+ password: password
+ creds: DBA
+ db name: hca

## Migrate DB
$ cd server\db
$ node migrate
$ node seed

## Start Server in Inspect Mode
$ cd server
$ npm run dev

## Routes/Contracts
### Users Data from ProsgreSQL file users

POST (Login) - http://localhost:3000/users/login
username
password

POST (Register) - http://localhost:3000/users/register
username
password
email

GET (All non-admin users) - http://localhost:3000/users/data

GET (One User by userid) - http://localhost:3000/users/data/1

PUT (Update User Profile) - http://localhost:3000/users/data/2
email

DELETE (Delete User Profile) - http://localhost:3000/users/data/10

### Leagues Data from JSON Leagues File

GET (All Leagues) - http://localhost:3000/leagues/data

### Teams Data from JSON Teams File

GET (All Teams) - http://localhost:3000/teams/data

GET (One Team by Team ID) - http://localhost:3000/teams/data/1

DELETE (One Team by Team ID) - http://localhost:3000/teams/data/51
