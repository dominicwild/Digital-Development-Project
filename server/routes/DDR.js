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
  .route("/strengths/")

  .post(function(req, res) {
    DDRModel.getStrengths(req.user._id)
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
  .route("/opportunities/")

  .post(function(req, res) {
    DDRModel.getOpportunities(req.user._id)
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
    DDRModel.update(req.user._id, req.body)
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
    const ddr = req.body;
    const skill = { skill: ddr.newSkill };
    delete ddr["newSkill"];
    DDRModel.update(req.user._id,ddr)
      .then(result => {
        res.send({ success: result }); //Send back response, THEN attempt to add new skill
        SkillModel.create(skill);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  });

router
  .route("/routine/")

  .put(function(req, res) {
    console.log(req.body)
    const body = req.body;
    DDRModel.insertRoutine(req.user._id, body.routine)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err)
        res.status(400).send(err);
      });
  })

  .post(function(req, res) {
    const body = req.body;
    DDRModel.removeRoutine(req.user._id, body.routine)
      .then(result => {
        res.send({ success: true });
      })
      .catch(err => {
        res.send(err);
        console.log("Error in delete routine ", err);
      });
  });

router
  .route("/routines/")

  .post(function(req, res) {
    DDRModel.getRoutines(req.user._id)
      .then(result => {
        if (result) {
          res.send(result);
        } else {
          res.send([{ none: true }]);
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

module.exports = router;
