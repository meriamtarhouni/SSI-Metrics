﻿var express = require('express');
const {Rssi,Phase }= require('../db/models') ; 
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




module.exports = checklist; 