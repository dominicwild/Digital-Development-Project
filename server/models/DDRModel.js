const mongoose = require("../mongo");
const ObjectId = mongoose.Schema.Types.ObjectId;
//const Employee = require("./EmployeeModel").Employee;

const DDRSchema = new mongoose.Schema({
  employee: { type: ObjectId, Ref: "Employee", unique: true },
  ITXLevel: { type: String, enum: ["I", "T", "X"] },
  assignmentArea: { type: String, trim: true },
  aspirationShort: { type: String, trim: true },
  aspirationLong: { type: String, trim: true },
  stengths: [{ type: ObjectId, Ref: "Skill" }],
  opportunities: [{ type: ObjectId, Ref: "Skill" }],
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

function create(ddr) {
  // console.log(ddr)
  // const id = await Employee.find({firstName: "Baller"}).exec()
  // console.log("The id is: ", id)
  // ddr.employee = "" + id[0]._id
  // console.log(ddr)
  return DDR.create(ddr);
}

function get(id) {
  return DDR.findById(id).exec();
}

function update(ddr) {
  return DDR.update({ _id: skill.id }, skill);
}

function destroy(id) {
  return DDR.findByIdAndDelete(id);
}

module.exports = { create, get, update, destroy };
