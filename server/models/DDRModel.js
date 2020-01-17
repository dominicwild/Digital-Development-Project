const mongoose = require("../mongo");
const Skill = require("./SkillModel");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { frequency, status } = require("../../src/ModelEnums/DDRModelEnums");
const { ensureSet } = require("../../src/UtilityFunctions");

const DDRSchema = new mongoose.Schema({
  employeeId: { type: String, ref: "Employee", index: true, unique: true },
  mongoId: { type: ObjectId, ref: "Employee", unique: true },
  strengths: { type: [String], set: ensureSet, default: [] },
  opportunities: { type: [String], set: ensureSet, default: [] },
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
  return DDR.findOne({ mongoId: id }).exec();
}

function update(id, ddr) {
  return DDR.updateOne({ mongoId: id }, ddr);
}

function destroy(id) {
  return DDR.findByIdAndDelete(id);
}

function getStrengths(id) {
  return DDR.findOne({ mongoId: id })
    .select("strengths")
    .exec();
}

function getOpportunities(id) {
  return DDR.findOne({ mongoId: id })
    .select("opportunities")
    .exec();
}

function updateSkills(ddr) {
  const newSkill = { skill: ddr.newSkill };
  delete ddr["newSkill"];
  return DDR.updateOne({ mongoId: ddr.mongoId }, ddr)
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

/**
 * Adds a goal to the database for the specified employee. It will update the goal if it already exists, otherwise it will insert it as a new goal.
 * @param {Integer} employeeId The Id of the employee to add the goal to
 * @param {any} goal The goal to add to the DDR that corresponds to the employee ID
 */
function insertGoal(mongoId, goal) {
  return DDR.updateOne(
    {
      mongoId: mongoId,
      "goals.developmentArea": goal.developmentArea
    },
    { mongoId: mongoId, $set: { "goals.$": goal } },
    { upsert: true }
  ).catch(err => {
    if (err.code === 2) {
      //Means the search query for development area did not find a match
      return DDR.update(
        {
          mongoId: mongoId
        },
        {
          $push: { goals: goal }
        },
        { upsert: true }
      );
    } else if (err.code === 11000) {
      console.error(err);
      return DDR.updateOne(
        {
          mongoId: mongoId,
          //"goals.developmentArea": goal.developmentArea
        },
        { $push: { "goals": goal } }
      );
    } else {
      throw err;
    }
  });
}

function removeGoal(mongoId, goal) {
  return DDR.updateOne(
    {
      mongoId: mongoId
    },
    {
      $pull: { goals: { developmentArea: goal.developmentArea } }
    }
  );
}

function getGoals(id) {
  return DDR.findOne({ mongoId: id })
    .select("goals")
    .exec();
}

module.exports = { create, get, getStrengths, getOpportunities, update, destroy, updateSkills, insertGoal, getGoals, removeGoal };
