const router = require("express").Router();

/* GET home page */
router.get("/hola", (req, res, next) => {
  res.render("index.hbs");
});

module.exports = router;
