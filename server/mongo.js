const mongoose = require("mongoose");
const config = require('./config');


// const mongoUri = encodeURI(`mongodb://${config.host}:${config.key}@${config.host}:${config.port}/admin?ssl=true`)
const mongoUri = "mongodb://localhost:C2y6yDjf5%2FR%2Bob0N8A7Cgv30VRDJIWEHLM%2B4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw%2FJw%3D%3D@localhost:10255/admin?ssl=true"

function connect(){
    return mongoose.connect(mongoUri,{useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports =  { mongoose, connect}