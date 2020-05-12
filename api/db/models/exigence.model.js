const mongoose = require("mongoose");

const Exigence = mongoose.model(
  "exigence",
  new mongoose.Schema({
    nom: String,
    clause: String,
    complete: Boolean,
    phase_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "phase"
    }
  })
);

module.exports = {Exigence};