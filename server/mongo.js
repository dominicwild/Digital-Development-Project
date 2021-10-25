const mongoose = require("mongoose");
const config = require('./config');

const mongoUri = config.connectionString

function connect(){
    mongoose.connect(mongoUri,{useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports =  mongoose