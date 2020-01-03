const router = require("express").Router();
const mongoose = require("../mongo");
const EmployeeModel = require("../models/EmployeeModel");
const SkillModel = require("../models/SkillModel");
const DDRModel = require("../models/DDRModel");
const employeeRoutes = require("./Employee")
const skillRoutes = require("./Skill")
const ddrRoutes = require("./DDR")
const config = require("../config");

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

router.use("/employee", employeeRoutes)
router.use("/skill", skillRoutes)
router.use("/ddr", ddrRoutes)

module.exports = router;
