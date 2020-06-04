﻿var express = require('express');
const {Rssi,Phase,Exigence,Tache,Sous_tache, Collaborateur}= require('../db/models') ; 
//A router object is an isolated instance of middleware and routes.
var checklist = express.Router();
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// check whether the request has a valid JWT access token i.e whether the rssi is authentified
let authenticateRssi = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, Rssi.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE RSSI *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.rssi_id = decoded._id;
            next();
        }
    });
}

// check whether the request of the Collaborateur has a valid JWT access token
let authenticateCollaborateur = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, Collaborateur.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.collaborateur_id = decoded._id;
            next();
        }
    });
}



//Get all phases
checklist.get('/phases' ,authenticateRssi,(req,res) => {
      
    Phase.find({}).then((phases) => {
        res.send(phases);
    })
  });



  checklist.get('/PDCA' ,authenticateCollaborateur,(req,res) => {
      
    Phase.find({}).then((phases) => {
        res.send(phases);
    })
  });
  

//Get phase credentials by Id
checklist.get('/phases/:id',authenticateRssi,(req, res) => {
  
    Phase.find({
        _id: req.params.id,
    }).then((phase) => {
        res.send(phase);
    })
});



//Get all requirements(exigence) in a specific Phase

checklist.get('/phases/:phaseId/exigences',authenticateRssi,(req,res)=> {
   
    Exigence.find({
        phase_id: req.params.phaseId
    }).then((exigences)=>{
        res.send(exigences);
    })

});

//Get all tasks in a specific requirement(Exigence)

checklist.get('/exigences/:exigenceId/taches',authenticateRssi,(req,res)=>{
   
    Tache.find({
        exigence_id: req.params.exigenceId
    }).then((taches)=>{
        res.send(taches);
    })

});


//Get all subTasks in a specific Task

checklist.get('/taches/:tacheId/sousTaches',authenticateRssi,(req,res)=>{
     
    Sous_tache.find({
        tache_id: req.params.tacheId
    }).then((sous_taches)=>{
        res.send(sous_taches);
    })

});
/*
checklist.get('/sousTaches' ,(req,res)=> {
    Sous_tache.find({}).then((sstaches) => {
        res.send(sstaches);
       // console.log(sstaches);
    }).catch((e) => {
        res.send(e);
   
})

})
*/
checklist.get('/sousTaches/:phaseId/pas_mis_en_oeuvre',authenticateCollaborateur, (req, res)=> {
    Sous_tache.find({phase_id: req.params.phaseId,etat : "pas mis en oeuvre"}).then((todo_sstaches)=>{
        res.send(todo_sstaches);
    }).catch( (e) => {
        res.send(e);
    })
}) 


checklist.get('/sousTaches/:phaseId/en_cours',authenticateCollaborateur, (req, res)=> {
    Sous_tache.find({etat : "en cours",phase_id: req.params.phaseId}).then((inprogress_sstaches)=>{
        res.send(inprogress_sstaches);
    }).catch( (e) => {
        res.send(e);
    })
}) 


checklist.get('/sousTaches/:phaseId/termine',authenticateCollaborateur, (req, res)=> {
    Sous_tache.find({etat : "terminé", phase_id: req.params.phaseId }).then((done_sstaches)=>{
        res.send(done_sstaches);
    }).catch( (e) => {
        res.send(e);
    })
}) 

checklist.get('/sousTaches/tache/:id',(req, res) => {
  
    Tache.find({
        _id: req.params.id,
    }).then((tache) => {
        res.send(tache);
    })
});

checklist.get('/sousTaches/exigence/:id',(req, res) => {
  
    Exigence.find({
        _id: req.params.id,
    }).then((exigence) => {
        res.send(exigence);
    })
});

checklist.get('/sousTaches/collaborateur/:id',(req, res) => {
  
    Collaborateur.find({
        _id: req.params.id,
    }).then((collaborateur) => {
        res.send(collaborateur);
    })
});




module.exports = checklist; 