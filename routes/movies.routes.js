const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render("movies/new-movie.hbs", { celebrities });
    })
    .catch((err) => next(err));
});

router.post("/create", (req, res, next) => {
  Movie.create(req.body)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

router.get("/", (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.render("movies/movies.hbs", { lista: movies });
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details.hbs", { movie });
    })
    .catch((err) => next(err));
});

router.post("/:id/delete", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findByIdAndDelete(movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

router.get("/:id/edit", (req, res, next) => {
  const movieId = req.params.id;
  Promise.all([
    Celebrity.find({}),
    Movie.findById(movieId),
  ])
    .then(([celebrities, movie]) => {
      res.render("movies/edit-movie.hbs", { celebrities, movie });
    })
    .catch((err) => next(err));
});

router.post("/:id/edit", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findByIdAndUpdate(movieId, req.body)
    .then(() => {
      res.redirect("/movies/" + movieId);
    })
    .catch((err) => next(err));
});

module.exports = router;
