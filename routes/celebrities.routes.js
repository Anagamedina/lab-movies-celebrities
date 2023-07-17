const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/create", (req, res, next) => {
  Celebrity.create(req.body)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      res.render("celebrities/new-celebrity.hbs", { error: err.message });
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render("celebrities/celebrities.hbs", { celebrities });
    })
    .catch((err) => next(err));
});

module.exports = router;
