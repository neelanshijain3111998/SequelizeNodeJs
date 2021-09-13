const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodejs", "root", "neel@123", {
  dialect: "mysql",
  host: "localhost",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connection established with sequalize");
  })
  .catch((err) => {
    console.log("unable to connect to the database", err);
  });

module.exports = sequelize;
