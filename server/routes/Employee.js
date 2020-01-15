const router = require("express").Router();
const EmployeeModel = require("../models/EmployeeModel");
const DDRModel = require("../models/DDRModel");

/**
 * Employee Routes
 */
router
  .route("/:id")

  .get(function(req, res, next) {
    EmployeeModel.get(req.params.id)
      .then(employee => {
        res.send(employee);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  })

  .delete(function(req, res, next) {
    EmployeeModel.destroy(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

router
  .route("/")

  .post(function(req, res) {
    EmployeeModel.create(req.body)
      .then(savedEmployee => {
        res.send(savedEmployee);
      })
      .catch(err => {
        if (err.name === "MongoError") {
          if (err.code === 11000) {
            return res.status(409).send(err);
          }
        }
        res.status(400).send(err);
      });
  })

  .put(function(req, res) {
    EmployeeModel.update(req.user._id, req.body)
      .then(result => {
        res.send(`${result.n} employee${result.n > 1 ? "s" : ""} has been updated`);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

module.exports = router;
