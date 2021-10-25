const mongoose = require("../mongo");
const Skill = require("./SkillModel");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { frequency, status, developmentArea } = require("../../src/ModelEnums/DDRModelEnums");
const { ensureSet, randInt } = require("../../src/UtilityFunctions");

const DDRSchema = new mongoose.Schema({
  employeeId: { type: String, ref: "Employee", index: true, unique: true },
  mongoId: { type: ObjectId, ref: "Employee", unique: true },
  strengths: { type: [String], set: ensureSet, default: [] },
  opportunities: { type: [String], set: ensureSet, default: [] },
  aspirationShort: { type: String, trim: true },
  aspirationLong: { type: String, trim: true },
  routines: [
    {
      developmentArea: { type: String, enum: developmentArea ,trim: true }, //E.g. Develop as Employee, develop in current role, develop as IT professional, personal routines
      action: { type: String, trim: true }, //What you will do to achieve that routine
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
 * Adds a routine to the database for the specified employee. It will update the routine if it already exists, otherwise it will insert it as a new routine.
 * @param {Integer} employeeId The Id of the employee to add the routine to
 * @param {any} routine The routine to add to the DDR that corresponds to the employee ID
 */
function insertRoutine(mongoId, routine) {
  return DDR.updateOne(
    {
      mongoId: mongoId,
      "routines._id": routine._id
    },
    { mongoId: mongoId, $set: { "routines.$": routine } },
    { upsert: true }
  ).catch(err => {
    if (err.code === 2) {
      //Means the search query for development area did not find a match
      return DDR.update(
        {
          mongoId: mongoId
        },
        {
          $push: { routines: routine }
        },
        { upsert: true }
      );
    } else if (err.code === 11000) {
      console.error(err);
      return DDR.updateOne(
        {
          mongoId: mongoId,
          //"routines.developmentArea": routine.developmentArea
        },
        { $push: { "routines": routine } }
      );
    } else {
      throw err;
    }
  });
}

function removeRoutine(mongoId, routine) {
  return DDR.updateOne(
    {
      mongoId: mongoId
    },
    {
      $pull: { routines: { developmentArea: routine.developmentArea } }
    }
  );
}

function getRoutines(id) {
  return DDR.findOne({ mongoId: id })
    .select("routines")
    .exec();
}

module.exports = { create, get, getStrengths, getOpportunities, update, destroy, updateSkills, insertRoutine, getRoutines, removeRoutine };
