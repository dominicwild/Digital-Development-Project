const mongoose = require("../mongo");

const SkillSchema = new mongoose.Schema({
  skill: {
    type: String,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 }
    },
    required: true,
    trim: true
  }
});

const Skill = mongoose.model("Skill", SkillSchema);

function create(skill) {
  return Skill.create(skill).catch(err => {
    if (err.code === 11000) {
      console.error("[ERROR] Entered duplicate skill");
    }
  });
}

function get(id) {
  return Skill.findById(id).exec();
}

function update(skill) {
  return Skill.update({ _id: skill.id }, skill);
}

function destroy(id) {
  return Skill.findByIdAndDelete(id);
}

module.exports = { create, get, update, destroy };
