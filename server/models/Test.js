// const mongoose = require("../mongo");

// const userSchema = new mongoose.Schema({
//   name: { type: String },
//   company: {type : mongoose.Schema.Types.ObjectId}
// });

// const Skill = mongoose.model("Skill", SkillSchema);
// Skill.init()

// function create(skill) {
//   return Skill.create(skill);
// }

// function get(id) {
//   return Skill.findById(id).exec();
// }

// function update(skill) {
//     return Skill.update({_id: skill.id}, skill);
// }

// function destroy(id) {
//   return Skill.findByIdAndDelete(id);
// }

// module.exports = { create, get, update, destroy };