const mongoose = require("../mongo");
const DDRModel = require("./DDRModel");

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  employeeId: { type: String },
  email: { type: String, required: true, trim: true },
  ITXLevel: { type: Number, enum: [1, 2, 3] },
  assignmentArea: { type: String, trim: true },
  aspirationShort: { type: String, trim: true },
  aspirationLong: { type: String, trim: true },
  isManager: { type: Boolean, default: false },
  outlookId: { type: String, required: true }
});

const Employee = mongoose.model("Employee", EmployeeSchema);
Employee.init();

function create(employee) {
  return Employee.create(employee).then(savedEmployee => {
    DDRModel.create({ mongoId: savedEmployee._id }).catch(err => {
      console.error(err);
    });
    return savedEmployee;
  });
}

function get(id) {
  return Employee.find({ employeeId: "" + id }).exec();
}

function getById(id) {
  return Employee.findById(id).exec();
}

function getByOutlookId(id) {
  return Employee.findOne({ outlookId: id }).exec();
}

function update(id,employee) {
  return Employee.findByIdAndUpdate(id, employee);
}

function destroy(id) {
  return Employee.deleteOne({ employeeId: id });
}

module.exports = { create, get, getById, getByOutlookId, update, destroy, Employee };
