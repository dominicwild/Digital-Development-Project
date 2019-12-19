const mongoose = require("../mongo");

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, trim: true },
  isManager: { type: Boolean, default: false }
});

const Employee = mongoose.model("Employee", EmployeeSchema);
Employee.init()

function create(employee) {
  return Employee.create(employee);
}

function get(id) {
  return Employee.find({ employeeId: "" + id }).exec();
}

function update(employee) {
  return Employee.update({ employeeId: employee.employeeId }, employee);
}

function destroy(id) {
  return Employee.deleteOne({ employeeId: id });
}

module.exports = { create, get, update, destroy, Employee };
