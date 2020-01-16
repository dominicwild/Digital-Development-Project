const router = require("express").Router();
const mongoose = require("../mongo");
const EmployeeModel = require("../models/EmployeeModel");
const SkillModel = require("../models/SkillModel");
const DDRModel = require("../models/DDRModel");
const employeeRoutes = require("./Employee");
const skillRoutes = require("./Skill");
const ddrRoutes = require("./DDR");
const authRoutes = require("./Auth");
const config = require("../config");
const authCheck = require("../middleware/AuthCheck");
const CheckList = require("../Other/CheckList");

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
  console.log(err);
});

// employeeRoutes.all("*", authCheck);
// ddrRoutes.all("*", authCheck);
// skillRoutes.all("*", authCheck);

router.use("/employee", employeeRoutes);
router.use("/skill", skillRoutes);
router.use("/ddr", ddrRoutes);
router.use("/auth", authRoutes);

router.get("/whoami", function(req, res) {
  const user = req.user;
  if (user) {
    res.send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      employeeId: user.employeeId,
      assignmentArea: user.assignmentArea,
      ITXLevel: user.ITXLevel,
      aspirationShort: user.aspirationShort,
      aspirationLong: user.aspirationLong,
      loggedOn: true
    });
  } else {
    res.send({ loggedOn: false });
  }
});

router.get("/checklist", function(req, res) {
  if (req.user) {
    const user = req.user;
    EmployeeModel.getById(user._id).then(user => {
      if (user) {
        const userCheckList = CheckList.checkUser(user);
        DDRModel.get(user._id).then(ddr => {
          if (ddr) {
            const skillsCheckList = CheckList.checkSkills(ddr);
            const goalsCheckList = CheckList.checkGoals(ddr);
            res.send([userCheckList, skillsCheckList, goalsCheckList]);
          } else {
            res.status(404).send("DDR not found.");
          }
        });
      } else {
        res.status(404).send("User not found.");
      }
    });
  } else {
    res.status(404).send("User not logged in.");
  }
});

module.exports = router;
