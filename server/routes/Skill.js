const router = require("express").Router();
const SkillModel = require("../models/SkillModel");
const authCheck = require("../middleware/AuthCheck");

/**
 * Skill Routes
 */
router
  .route("/:id")

  .get(function(req, res) {
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
  .route("/")

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

module.exports = router;
