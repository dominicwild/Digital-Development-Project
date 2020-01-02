const config = require("./ReactConfig");
module.exports = JSON.parse(localStorage.getItem(config.user));
