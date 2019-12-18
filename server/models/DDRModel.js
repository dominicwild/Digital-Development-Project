const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const DDRSchema = new mongoose.Schema({
    employee: {type: ObjectId, Ref: "Employee"},
    ITXLevel: {type: String},
    assignmentArea: {type: String},
    aspirationShort: {type: String},
    aspirationLong: {type: String},
    stengths: [{type: ObjectId, Ref: "Skill"}],
    opportunities: [{type: ObjectId, Ref: "Skill"}],
    goals: {
        developmentArea: {type: String},
        action: {type: String},
        frequency: {enum: ["Daily","Weekly","Monthly","Yearly"]},
        duration: {type: Number},
        status: {enum: ["Open","Closed"]},
        startDate: {type: Number},
    }
})

const DDR = mongoose.model("DDR", DDRSchema)

module.exports = DDR
