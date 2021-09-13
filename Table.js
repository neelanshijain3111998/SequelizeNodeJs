const Sequelize = require("sequelize");
const sequelize = require("./SequelizeConnection");
const { DataTypes } = require("sequelize");

// define the model
const Rajasthan = sequelize.define("rajasthans", {
  // Model attributes are defined here
  CORPORATE_IDENTIFICATION_NUMBER: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Company_Name: { type: DataTypes.STRING, allowNull: false },

  Company_status: { type: DataTypes.STRING, allowNull: false },
  Company_class: { type: DataTypes.STRING, allowNull: false },
  Company_Category: { type: DataTypes.STRING, allowNull: false },
  Company_sub_category: { type: DataTypes.STRING, allowNull: false },
  DATE_OF_REGISTRATION: { type: DataTypes.DATEONLY, allowNull: false },
  Year: { type: DataTypes.STRING, allowNull: false },

  REGISTERED_STATE: { type: DataTypes.STRING, allowNull: false },
  AUTHORIZED_CAP: { type: DataTypes.INTEGER, allowNull: false },
  PAIDUP_CAPITAL: { type: DataTypes.STRING, allowNull: false },
  Industrial_Class: { type: DataTypes.STRING, allowNull: false },
  PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Registered_Office_Address: { type: DataTypes.STRING, allowNull: false },
  REGISTRAR_OF_COMPANIES: { type: DataTypes.STRING, allowNull: false },
  EMAIL_ADDR: { type: DataTypes.STRING, allowNull: false },
  Latest_Year_AR: { type: DataTypes.STRING, allowNull: false },
  Latest_Year_BS: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Rajasthan;
