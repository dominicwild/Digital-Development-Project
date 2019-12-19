const mongoose = require("../mongo")

const EmployeeSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    employeeId: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    isManager: {type: Boolean, default: false}
})

const Employee = mongoose.model("Employee", EmployeeSchema)

function create(employee){
    return new Employee(employee).save()
}

function get(id){
    return Employee.find({employeeId: "" + id}).exec()
}

function update(employee){
    return Employee.update({employeeId: employee.employeeId}, employee)
}

function destroy(id){
    return Employee.deleteOne({employeeId: id})
}

module.exports = {create, get, update, destroy}
