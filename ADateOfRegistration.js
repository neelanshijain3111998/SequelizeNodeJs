const sequelize = require("./SequelizeConnection");
const Rajasthan = require("./Table");
const { Op } = require("sequelize");
const fs = require("fs");

function testcase2() {
  Rajasthan.findAll({
    attributes: [
      "Year",
      [sequelize.fn("COUNT", sequelize.col("Year")), "count"],
    ],
    where: { Year: { [Op.between]: [2000, 2019] } },
    group: ["Year"],
    order: ["Year"],

    raw: true,
  })
    .then((Auth2) => {
      console.log(Auth2);
      obj = {};
      for (let i = 0; i < Auth2.length; i++) {
        obj[Auth2[i].Year] = Auth2[i].count;
      }
      return obj;
    })
    .then((result) => {
      console.log(result);
      fs.writeFileSync("Test2.json", JSON.stringify(result), "utf-8", (err) => {
        if (err) console.log(err);
      });
    });
}

/*async function testcase2() {
  const test2 = await Rajasthan.findAll({
    attributes: [
      "Year",
      [sequelize.fn("COUNT", sequelize.col("Year")), "count"],
    ],
    where: { Year: { [Op.between]: [2000, 2019] } },
    group: ["Year"],
    order: ["Year"],

    raw: true,
  });
  obj = {};
  for (let i = 0; i < test2.length; i++) {
    obj[test2[i].Year] = test2[i].count;
  }
  fs.writeFileSync("Test2.json", JSON.stringify(obj), "utf-8", (err) => {
    if (err) console.log(err);
  });
}
*/

module.exports = {
  DateOfRegistrationProblem: testcase2,
};
