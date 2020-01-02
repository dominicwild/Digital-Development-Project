const mongoose = require("../mongo");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Employee = require("./EmployeeModel");

const DDRSchema = new mongoose.Schema({
  employeeId: { type: String, ref: "Employee", required: true },
  aspirationShort: { type: String, trim: true },
  aspirationLong: { type: String, trim: true },
  strengths: [{ type: ObjectId, ref: "Skill" }],
  opportunities: [{ type: ObjectId, ref: "Skill" }],
  goals: [
    {
      developmentArea: { type: String, trim: true },
      action: { type: String, trim: true },
      frequency: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "Yearly"]
      },
      duration: { type: Number },
      status: { type: String, enum: ["Open", "Closed"] },
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
  console.log("Getting employee");
  return DDR.findOne({ employeeId: id }).exec();
}

function update(ddr) {
  return DDR.update({ employeeId: ddr.employeeId }, ddr);
}

function destroy(id) {
  return DDR.findByIdAndDelete(id);
}

function getStrengths(id) {
  return DDR.findOne({ employeeId: id })
    .populate("strengths")
    .select("strengths")
    .exec();
}

function getOpportunities(id) {
  return DDR.findOne({ employeeId: id })
    .populate("opportunities")
    .select("opportunities")
    .exec();
}

module.exports = { create, get, getStrengths, getOpportunities, update, destroy };
