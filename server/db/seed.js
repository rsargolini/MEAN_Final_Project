const connection = require("./connection");
const usersData = require("./seed_data/users.json");

connection.Users.destroy({ where: {} }).then(() =>
{
    connection.Users.bulkCreate(usersData).then(() =>
    {
        process.exit();
    });
});