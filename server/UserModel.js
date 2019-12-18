const mongoose = require("mongoose")

const user = new mongoose.Schema({
    id: { type: 'Number', unique: true },
    quiz: []
  });

const User = mongoose.model('User', user);

module.exports = User