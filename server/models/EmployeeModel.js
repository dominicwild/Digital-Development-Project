const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    employeeId: {type: String, required: true, unqiue: true},
    email: {type: String, required: true},
    isManager: {type: Boolean, default: false}
})

const Employee = mongoose.model("Employee", EmployeeSchema)

module.exports = Employee
