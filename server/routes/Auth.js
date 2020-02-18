const router = require("express").Router();
require("../passportInit");
const passport = require("passport");

router.get(
  "/outlook",
  passport.authenticate("azure_ad_oauth2",),
  function(req, res) {}
);

router.get("/outlook/callback", passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect("http://localhost:3000/");
  console.log("Authenticated: ", req.user.firstName);
});

router.get("/logout", function(req, res) {
  req.logOut();
  res.redirect("http://localhost:3000/login");
});

module.exports = router;
