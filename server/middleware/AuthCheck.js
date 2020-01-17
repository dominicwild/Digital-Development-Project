module.exports = (req, res, next) => {
  console.log("AuthCheck");
  // console.log(req)
  if (req.user) {
    next();
  } else {
    //res.redirect("http://localhost:3000/login");
    console.log("Would redirect");
    next();
  }
};
