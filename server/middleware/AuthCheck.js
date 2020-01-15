module.exports = (req, res, next) => {
  console.log("AuthCheck");
  if (req.user) {
    next();
  } else {
    // res.redirect("/login");
    next();
  }
};
