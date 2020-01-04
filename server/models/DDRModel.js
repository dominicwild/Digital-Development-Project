const mongoose = require("../mongo");
const Skill = require("./SkillModel");
const {frequency, status} = require( "../../src/ModelEnums/DDRModelEnums")

const DDRSchema = new mongoose.Schema({
  employeeId: { type: String, ref: "Employee", required: true, index: true },
  aspirationShort: { type: String, trim: true },
  aspirationLong: { type: String, trim: true },
  strengths: [{ type: String, ref: "Skill"}],
  opportunities: [{ type: String, ref: "Skill"}],
  goals: [
    {
      developmentArea: { type: String, trim: true }, //E.g. Develop as DXC Employee, develop in current role, develop as IT professional, personal goals
      action: { type: String, trim: true }, //What you will do to achieve that goal
      frequency: {
        type: String,
        enum: frequency
      },
      duration: { type: Number },
      status: { type: String, enum: status },
      startDate: { type: Number }
    }
  ]
});

const DDR = mongoose.model("DDR", DDRSchema);
DDR.init();

function create(ddr) {
  return DDR.create(ddr);
}

function get(id) {
  return DDR.findOne({ employeeId: id }).exec();
}

function update(ddr) {
  return DDR.updateOne({ employeeId: ddr.employeeId }, ddr);
}

function destroy(id) {
  return DDR.findByIdAndDelete(id);
}

function getStrengths(id) {
  return DDR.findOne({ employeeId: id })
    .select("strengths")
    .exec();
}

function getOpportunities(id) {
  return DDR.findOne({ employeeId: id })
    .select("opportunities")
    .exec();
}




function updateSkills(ddr) {
  const newSkill = { skill: ddr.newSkill };
  delete ddr["newSkill"];
  return DDR.updateOne({ employeeId: ddr.employeeId }, ddr)
    .exec()
    .then(result => {
      if (result.n === 1) {
        Skill.create(newSkill);
        return true;
      } else {
        return false;
      }
    });
}

module.exports = { create, get, getStrengths, getOpportunities, update, destroy, updateSkills };
