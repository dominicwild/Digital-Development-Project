const router = require("express").Router();
const DDRModel = require("../models/DDRModel");
const SkillModel = require("../models/SkillModel");

/**
 * DDR Routes
 */
router
  .route("/:id")

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

/**
 * Gets the strengths at a particular Employee ID
 */
router
  .route("/strengths/:id")

  .get(function(req, res) {
    DDRModel.getStrengths(req.params.id)
      .then(ddr => {
        res.send(ddr);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

/**
 * Gets the opportunities at a particular Employee ID
 */
router
  .route("/opportunities/:id")

  .get(function(req, res) {
    DDRModel.getOpportunities(req.params.id)
      .then(ddr => {
        res.send(ddr);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

router
  .route("/")

  .post(function(req, res, next) {
    DDRModel.create(req.body)
      .then(savedDDR => {
        res.send(savedDDR);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  })

  .put(function(req, res) {
    DDRModel.update(req.body)
      .then(result => {
        res.send({ success: result.n === 1, message: `${result.n} DDR${result.n > 1 ? "s" : ""} has been updated` });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

//Used for updating the DDR when the strengths or opportunities change to update the skills table
router
  .route("/skills/")

  .put(function(req, res) {
    let body = req.body;
    let skill = { skill: body.newSkill };
    delete body["newSkill"];
    DDRModel.update(body)
      .then(result => {
        res.send({ success: result }); //Send back response, THEN attempt to add new skill
        SkillModel.create(skill);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  router
  .route("/goal")

  .put(function(req, res){
    const body = req.body
      DDRModel.insertGoal(body.employeeId,body.goal).then(result => {
        res.send(result)
      }).catch(err => {
        res.status(400).send(err)
      })
  })

  router
  .route("/goals/:id")

  .get(function(req,res){
    DDRModel.getGoals(req.params.id).then(result => {
      res.send(result)
    }).catch(err => {
      res.status(400).send(err)
    })
  })

module.exports = router;
