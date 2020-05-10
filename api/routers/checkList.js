﻿var express = require('express');
const {Rssi,Phase,Exigence,Tache,Sous_tache}= require('../db/models') ; 
//A router object is an isolated instance of middleware and routes.
var checklist = express.Router();
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



let authenticate = (req, res, next) => {
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


//Get all phases
checklist.get('/phases',authenticate,(req,res) => {
      
    Phase.find({}).then((phases) => {
        res.send(phases);
    })
  });

//Get phase credentials by Id
checklist.get('/phases/:id',authenticate,(req, res) => {
  
    Phase.find({
        _id: req.params.id,
    }).then((phase) => {
        res.send(phase);
    })
});



//Get all requirements(exigence) in a specific Phase

checklist.get('/phases/:phaseId/exigences', authenticate,(req,res)=> {
   
    Exigence.find({
        phase_id: req.params.phaseId
    }).then((exigences)=>{
        res.send(exigences);
    })

});

//Get all tasks in a specific requirement(Exigence)

checklist.get('/exigences/:exigenceId/taches',authenticate,(req,res)=>{
   
    Tache.find({
        exigence_id: req.params.exigenceId
    }).then((taches)=>{
        res.send(taches);
    })

});


//Get all subTasks in a specific Task

checklist.get('/taches/:tacheId/sousTaches',authenticate,(req,res)=>{
     
    Sous_tache.find({
        tache_id: req.params.tacheId
    }).then((sous_taches)=>{
        res.send(sous_taches);
    })

});



module.exports = checklist; 