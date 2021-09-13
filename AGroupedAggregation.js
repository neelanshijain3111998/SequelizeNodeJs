const sequelize = require("./SequelizeConnection");
const Rajasthan = require("./Table");
const { Op } = require("sequelize");
const fs = require("fs");

//testcase4
async function testcase4() {
  obj = {};
  for (let i = 2000; i <= 2019; i++) {
    obj[i] = {};
  }
  for (let i = 2000; i <= 2019; i++) {
    const test4 = await Rajasthan.findAll({
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
      where: { Year: i },
      group: ["PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN"],

      raw: true,
    });

    for (let j = 0; j < test4.length; j++) {
      obj[i][test4[j].PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN] = test4[j].count;
    }
  }
  fs.writeFileSync("Test4.json", JSON.stringify(obj), "utf-8", (err) => {
    if (err) console.log(err);
  });
}
//select count(PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN),PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN from neel2.dbo.Rajasthan where year(DATE_OF_REGISTRATION) = {0} group by PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN", i);

module.exports = {
  GroupedAggregationProblem: testcase4,
};
