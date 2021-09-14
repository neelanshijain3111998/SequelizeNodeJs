const sequelize = require("./SequelizeConnection");
const Rajasthan = require("./Table");
const { Op } = require("sequelize");
const fs = require("fs");

async function testcase1() {
  //SELECT count(*) AS `count` FROM `rajasthans` AS `rajasthans` WHERE `rajasthans`.`AUTHORIZED_CAP` <= '100000';
  let Auth1 = await Rajasthan.count({
    where: { AUTHORIZED_CAP: { [Op.lte]: 100000 } },
    raw: true,
  });

  //SELECT count(*) AS `count` FROM `rajasthans` AS `rajasthans` WHERE
  //(`rajasthans`.`AUTHORIZED_CAP` > '100000' AND `rajasthans`.`AUTHORIZED_CAP` <= '1000000');
  let Auth2 = await Rajasthan.count({
    where: {
      [Op.and]: [
        { AUTHORIZED_CAP: { [Op.gt]: 100000 } },
        { AUTHORIZED_CAP: { [Op.lte]: 1000000 } },
      ],
    },
  });

  //SELECT count(*) AS `count` FROM `rajasthans` AS `rajasthans` WHERE
  //(`rajasthans`.`AUTHORIZED_CAP` > '1000000' AND `rajasthans`.`AUTHORIZED_CAP` <= '10000000');
  let Auth3 = await Rajasthan.count({
    where: {
      [Op.and]: [
        { AUTHORIZED_CAP: { [Op.gt]: 1000000 } },
        { AUTHORIZED_CAP: { [Op.lte]: 10000000 } },
      ],
    },
  });

  //SELECT count(*) AS `count` FROM `rajasthans` AS `rajasthans` WHERE
  // (`rajasthans`.`AUTHORIZED_CAP` > '10000000' AND `rajasthans`.`AUTHORIZED_CAP` <= '100000000');
  let Auth4 = await Rajasthan.count({
    where: {
      [Op.and]: [
        { AUTHORIZED_CAP: { [Op.gt]: 10000000 } },
        { AUTHORIZED_CAP: { [Op.lte]: 100000000 } },
      ],
    },
  });

  // SELECT count(*) AS `count` FROM `rajasthans` AS `rajasthans` WHERE `rajasthans`.`AUTHORIZED_CAP` > '100000000';
  let Auth5 = await Rajasthan.count({
    where: { AUTHORIZED_CAP: { [Op.gt]: 100000000 } },
  });
  obj = {};
  (obj["<=1L"] = Auth1),
    (obj["1L to 10L"] = Auth2),
    (obj["10L to 1Cr"] = Auth3),
    (obj["1Cr to 10Cr"] = Auth4),
    (obj[">10Cr"] = Auth5),
    fs.writeFileSync("Test1.json", JSON.stringify(obj), "utf-8", (err) => {
      if (err) console.log(err);
    });
}

module.exports = {
  AuthorizedCapProblem: testcase1,
};
