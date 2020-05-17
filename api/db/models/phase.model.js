const mongoose = require("mongoose");

const Phase = mongoose.model(
  "phase",
  new mongoose.Schema({
    nom: String,
    enabled: Boolean,
    etat : String, //["Pas mis en oeuvre","En cours","Terminé"]
  })
);

module.exports = {Phase};