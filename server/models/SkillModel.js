const mongoose = require("../mongo");

const SkillSchema = new mongoose.Schema({
  skill: { type: String, required: true, unique: true, trim: true }
});

const Skill = mongoose.model("Skill", SkillSchema);

function create(skill) {
  return Skill.create(skill);
}

function get(id) {
  return Skill.findById(id).exec();
}

function update(skill) {
    return Skill.update({_id: skill.id}, skill);
}

function destroy(id) {
  return Skill.findByIdAndDelete(id);
}

module.exports = { create, get, update, destroy };
