const sequelize = require("./SequelizeConnection");
const Rajasthan = require("./Table");
const csv = require("csv-parser");
const fs = require("fs");
const mysql = require("mysql2");

("use strict"); //User input(load,analyzer) using prompt-sync
const ps = require("prompt-sync");
const prompt = ps();
let ID = prompt("");

//Loader part
//localeCompare return 0 if both string are same
if (!"load".localeCompare(ID)) {
  //create mysql connection
  const conn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "neel@123",
  });

  // create database if it doesn't already exist
  conn.connect((err) => {
    if (err) {
      console.log("Error connecting to Database", err);
    }
    console.log("established Connection with Mysql");
    conn.query(`CREATE DATABASE IF NOT EXISTS nodejs;`, (err) => {
      if (err) throw err;

      console.log(" database created");
    });
  });

  let Arrayy = [];
  //model.sync(options), an asynchronous function (that returns a Promise).
  // With this call, Sequelize will automatically perform an SQL query to the database.
  // This creates the table if it doesn't exist (and does nothing if it already exists)
  sequelize
    .sync()
    .then(() => {
      //console.log(result);
      fs.createReadStream("Rajasthan1.csv")
        .pipe(csv())
        .on("data", (data) => {
          const yr = data.DATE_OF_REGISTRATION;

          if (yr !== "NA") {
            let x = yr.split("-");

            if (parseInt(x[2]) >= 0 && parseInt(x[2]) < 20) {
              year = "20" + x[2];
              year = year;
              //console.log(year);
            } else {
              year = 0;
            }
          } else {
            year = 0;
          }
          Arrayy.push({
            CORPORATE_IDENTIFICATION_NUMBER:
              data.CORPORATE_IDENTIFICATION_NUMBER,
            Company_Name: data.Company_Name,
            DATE_OF_REGISTRATION: data.DATE_OF_REGISTRATION,
            Year: year,
            AUTHORIZED_CAP: data.AUTHORIZED_CAP,
            PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN:
              data.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN,
          });
        })
        .on("end", () => {
          Rajasthan.bulkCreate(Arrayy);
        });
    })
    .then(() => {
      console.log("Values inserted in table\n");
    })
    .catch((err) => {
      console.log(err);
    });
}
if (!"analyzer".localeCompare(ID)) {
  console.log("\n-----Data Project 2: Company Master------");
  console.log("Enter 1-For TestCase1 ");
  console.log("Enter 2-For TestCase2 ");
  console.log("Enter 3-For TestCase3 ");
  console.log("Enter 4-For TestCase4 ");
  console.log("Enter your choice:");
  const prompt = ps();
  let x = parseInt(prompt(""));

  switch (x) {
    case 1:
      const pr1 = require("./AAuthorizedCap.js");
      pr1.AuthorizedCapProblem();
      break;
    case 2:
      const pr2 = require("./ADateOfRegistration.js");
      pr2.DateOfRegistrationProblem();
      break;
    case 3:
      const pr3 = require("./APrincipalActivity2015.js");
      pr3.PrincipalActivityProblem();
      break;
    case 4:
      const pr4 = require("./AGroupedAggregation.js");
      pr4.GroupedAggregationProblem();
      break;

    default:
      console.log("please enter valid choice");
      break;
  }
}
