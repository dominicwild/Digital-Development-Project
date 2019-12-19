const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const DDRSchema = new mongoose.Schema({
    employee: {type: ObjectId, Ref: "Employee"},
    ITXLevel: {type: String, trim: true},
    assignmentArea: {type: String, trim: true},
    aspirationShort: {type: String, trim: true},
    aspirationLong: {type: String, trim: true},
    stengths: [{type: ObjectId, Ref: "Skill"}],
    opportunities: [{type: ObjectId, Ref: "Skill"}],
    goals: {
        developmentArea: {type: String,trim: true},
        action: {type: String, trim: true},
        frequency: {enum: ["Daily","Weekly","Monthly","Yearly"]},
        duration: {type: Number},
        status: {enum: ["Open","Closed"]},
        startDate: {type: Number},
    }
})

const DDR = mongoose.model("DDR", DDRSchema)

module.exports = DDR
