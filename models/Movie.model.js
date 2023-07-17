const mongoose = require("mongoose");
const Celebrity = require("./Celebrity.model");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Celebrity",
  }],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
