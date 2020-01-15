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

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

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
      loggedOn: true
    });
  } else {
    res.send({ loggedOn: false });
  }
});

module.exports = router;
