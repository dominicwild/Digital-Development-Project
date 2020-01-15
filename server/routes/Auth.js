const router = require("express").Router();
require("../passportInit");
const passport = require("passport");

router.get(
  "/outlook",
  passport.authenticate("windowslive", {
    scope: ["openid", "profile", "offline_access", "https://outlook.office.com/Mail.Read"]
  }),
  function(req, res) {}
);

router.get("/outlook/callback", passport.authenticate("windowslive", { failureRedirect: "/login" }), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect("http://localhost:3000/");
  console.log("Authenticated: ", req.user.firstName)
});

module.exports = router;
