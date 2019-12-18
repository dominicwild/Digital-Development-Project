const router = require("express").Router();

router
  .route("/employee/:id")
  .get(function(req, res, next) {
    
    res.json(req.params.id);
    
  })
  .put(function(req, res, next) {
    next(new Error("not implemented"));
    // just an example of maybe updating the user
    req.user.name = req.params.id;
    // save user ... etc
    res.json(req.user);
  })
  .post(function(req, res, next) {
    next(new Error("not implemented"));
  })
  .delete(function(req, res, next) {
    next(new Error("not implemented"));
  });

module.exports = router;
