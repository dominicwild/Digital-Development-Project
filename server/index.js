const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const routes = require("./routes/routes");
const passport = require("passport");
const cookieSession =require("cookie-session")
const config = require("./config")
const nocache = require('nocache');
const authCheck = require("./middleware/AuthCheck")

const app = express();
//app.use(nocache()); //Remove in production
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookieKey]
}))

// app.all("/api/employee/*", authCheck);
// app.all("/api/skill/*", authCheck);
// app.all("/api/ddr/*", authCheck);

//Passport initialisation
app.use(passport.initialize());
app.use(passport.session())

app.use("/api", routes);

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () => console.log("Express server is running on localhost:3001"));
