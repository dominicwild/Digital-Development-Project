const router = require("express").Router();
const EmployeeModel = require("./models/EmployeeModel");

router
  .route("/employee/:id")

  .get(function(req, res, next) {
    EmployeeModel.get(req.params.id)
      .then(employee => {
        res.send(employee);
      })
      .catch(err => {
        res.send(err);
      });
  })

  .delete(function(req, res, next) {
    EmployeeModel.destroy(req.params.id)
      .then(employee => {
        res.send(employee);
      })
      .catch(err => {
        res.send(err);
      });
  });

router
  .route("/employee")

  .post(function(req, res, next) {
    EmployeeModel.create(req.body)
      .then(savedEmployee => {
        res.send(savedEmployee.toJSON());
      })
      .catch(err => {
        res.send(err);
      });
  })

  .put(function(req, res, next) {
    EmployeeModel.update(req.body).then(result => {
      res.send(`${result.n} employee${result.n > 1 ? "s" : ""} has been updated`);
    }).catch((err) => {
      res.status(400).send(err)
    });
  });

module.exports = router;
