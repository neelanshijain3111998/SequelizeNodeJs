const Sequelize = require("sequelize");
const sequelize = require("./SequelizeConnection");
const { DataTypes } = require("sequelize");

// define the model
const Rajasthan = sequelize.define("rajasthans", {
  // Model attributes are defined here
  CORPORATE_IDENTIFICATION_NUMBER: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Company_Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  DATE_OF_REGISTRATION: { type: Sequelize.STRING, allowNull: false },
  Year: { type: DataTypes.INTEGER, allowNull: false },

  AUTHORIZED_CAP: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Rajasthan;
