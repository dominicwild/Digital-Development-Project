const router = require("express").Router();
const mongoose = require("./mongo");
const EmployeeModel = require("./models/EmployeeModel");
const SkillModel = require("./models/SkillModel");
const DDRModel = require("./models/DDRModel");
const config = require("./config");

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Employee Routes
 */
router
  .route("/employee/:id")

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
  .route("/employee")

  .post(function(req, res) {
    var a = EmployeeModel.create(req.body)
      .then(savedEmployee => {
        res.send(savedEmployee);
      })
      .catch(err => {
        if(err.name === "MongoError"){
          if(err.code === 11000){
            return res.status(409).send(err)
          }
        }
        res.status(400).send(err);
      });
  })

  .put(function(req, res, next) {
    EmployeeModel.update(req.body)
      .then(result => {
        res.send(`${result.n} employee${result.n > 1 ? "s" : ""} has been updated`);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

/**
 * Skill Routes
 */
router
  .route("/skill/:id")

  .get(function(req, res, next) {
    SkillModel.get(req.params.id)
      .then(skill => {
        res.send(skill);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  })

  .delete(function(req, res, next) {
    SkillModel.destroy(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

router
  .route("/skill")

  .post(function(req, res, next) {
    SkillModel.create(req.body)
      .then(savedSkill => {
        res.send(savedSkill);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  })

  .put(function(req, res, next) {
    SkillModel.update(req.body)
      .then(result => {
        res.send(`${result.n} skill${result.n > 1 ? "s" : ""} has been updated`);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

/**
 * DDR Routes
 */
router
  .route("/ddr/:id")

  .get(function(req, res, next) {
    DDRModel.get(req.params.id)
      .then(ddr => {
        res.send(ddr);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  })

  .delete(function(req, res, next) {
    DDRModel.destroy(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

router
  .route("/ddr")

  .post(function(req, res, next) {
    DDRModel.create(req.body)
      .then(savedDDR => {
        res.send(savedDDR);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  })

  .put(function(req, res, next) {
    DDRModel.update(req.body)
      .then(result => {
        res.send(`${result.n} DDR${result.n > 1 ? "s" : ""} has been updated`);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

module.exports = router;
