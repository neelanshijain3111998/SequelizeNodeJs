const sequelize = require("./SequelizeConnection");
const Rajasthan = require("./Table");
const csv = require("csv-parser");
const fs = require("fs");

("use strict"); //User input using prompt-sync
const ps = require("prompt-sync");

const prompt = ps();
let ID = prompt("");

//localeCompare return 0 if both string are same
if (!"load".localeCompare(ID)) {
  var mysql = require("mysql");
  var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "neel@123",
  });

  conn.connect(function (err) {
    if (err) throw err;
    //console.log("connection successful...");
    conn.query(
      `
      CREATE DATABASE IF NOT EXISTS nodejs;`,
      function (error) {
        if (error) throw error;

        //console.log("db created");
        conn.end();
      }
    );
  });

  //model.sync(options), an asynchronous function (that returns a Promise).
  // With this call, Sequelize will automatically perform an SQL query to the database.
  (async () => {
    await sequelize.sync();

    fs.createReadStream("Rajasthan.csv")
      .pipe(csv())
      .on("data", (data) => {
        Rajasthan.create({
          Company_Name: data.Company_Name,

          Company_status: data.Company_status,
          Company_class: data.Company_class,
          Company_Category: data.Company_Category,
          Company_sub_category: data.Company_sub_category,
          DATE_OF_REGISTRATION: data.DATE_OF_REGISTRATION,
          Year: DateYear(data.DATE_OF_REGISTRATION),
          REGISTERED_STATE: data.REGISTERED_STATE,
          AUTHORIZED_CAP: data.AUTHORIZED_CAP,
          PAIDUP_CAPITAL: data.PAIDUP_CAPITAL,
          Industrial_Class: data.Industrial_Class,
          PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN:
            data.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN,
          Registered_Office_Address: data.Registered_Office_Address,
          REGISTRAR_OF_COMPANIES: data.REGISTRAR_OF_COMPANIES,
          EMAIL_ADDR: data.EMAIL_ADDR,
          Latest_Year_AR: data.Latest_Year_AR,
          Latest_Year_BS: data.PAIDUP_CAPITAL,
        });

        // console.log(result);
      })
      .on("end", () => {
        console.log("Table created");
      });
  })();
}
if (!"analyzer".localeCompare(ID)) {
  console.log("\n-----Data Project 2: Company Master------");
  console.log("Enter 1-For TestCase1 ");
  console.log("Enter 2-For TestCase2 ");
  console.log("Enter 3-For TestCase3 ");
  console.log("Enter 4-For TestCase4 ");
  console.log("Enter 5-For Exit ");
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

const DateYear = (FUllDate) => {
  if (FUllDate != "NA") {
    //fetch the year
    let x = FUllDate.split("-");

    if (parseInt(x[2]) >= 0 && parseInt(x[2]) < 20) {
      year = "20" + x[2];
      return year;
    }
  }
};
