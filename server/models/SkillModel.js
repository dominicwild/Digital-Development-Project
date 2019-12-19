const mongoose = require("mongoose")

const SkillSchema = new mongoose.Schema({
    skill: {type: String, required: true, unqiue: true, trim: true}
})

const Skill = mongoose.model("Skill", SkillSchema)

module.exports = Skill
