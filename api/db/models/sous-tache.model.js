const mongoose = require("mongoose");

const Sous_tache = mongoose.model(
  "sous_tache",
  new mongoose.Schema({
    label: String,
    etat : String, //["Pas mis en oeuvre","En cours","Terminé"]
    tache_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tache"
      },
      date_debut: Date,
      date_fin:Date,
      clause: String,
      collaborateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collaborateurs"
      }
    
  })
);

module.exports = {Sous_tache};