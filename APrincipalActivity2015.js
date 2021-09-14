const sequelize = require("./SequelizeConnection");
const Rajasthan = require("./Table");
const { Op } = require("sequelize");
const fs = require("fs");

//testcase3
//method1 using .then
function testcase3() {
  Rajasthan.findAll({
    attributes: [
      "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN",
      [
        sequelize.fn(
          "COUNT",
          sequelize.col("PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN")
        ),
        "count",
      ],
    ],
    where: { Year: 2006 },
    group: ["PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN"],
    raw: true,
  })
    .then((test3) => {
      obj = {};
      for (let i = 0; i < test3.length; i++) {
        obj[test3[i].PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN] = test3[i].count;
      }
      return obj;
    })
    .then((result) => {
      console.log(result);
      fs.writeFileSync("Test3.json", JSON.stringify(result), "utf-8", (err) => {
        if (err) console.log(err);
      });
    });
}

//method2 using async/await
/*
  async function testcase3() {
    let test3 = await Rajasthan.findAll({
      attributes: [
        "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN",
        [
          sequelize.fn(
            "COUNT",
            sequelize.col("PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN")
          ),
          "count",
        ],
      ],
      where: { Year: 2006 },
      group: ["PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN"],
      raw: true,
    });
    obj = {};
    for (let i = 0; i < test3.length; i++) {
      obj[test3[i].PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN] = test3[i].count;
    }
    fs.writeFileSync("Test3.json", JSON.stringify(obj), "utf-8", (err) => {
      if (err) console.log(err);
    });
  }
  */
module.exports = {
  PrincipalActivityProblem: testcase3,
};
