const connection = require("./connection");
connection.sequelize.sync({ force: true }).then(() => {
  console.log("migrated");
  process.exit();
});
