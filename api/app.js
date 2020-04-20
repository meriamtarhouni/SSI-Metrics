const express = require('express');
const app = express();

const {Rssi} = require('./db/models');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');

// Load middleware
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hello world!");
})



/* RSSI ROUTES */

//Sign Up routes
app.post('/rssis', (req, res) => {
  

    let body = req.body;
    let newRssi = new Rssi(body);

    newRssi.save().then(() => {
        return newRssi.createSession();
    }).then((refreshToken) => {
       

        return newRssi.generateAccessAuthToken().then((accessToken) => {
           
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newRssi);
    }).catch((e) => {
        res.status(400).send(e);
    })
})


//Rssi login
app.post('/rssis/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Rssi.findByCredentials(email, password).then((rssi) => {
        return rssi.createSession().then((refreshToken) => {
          

            return rssi.generateAccessAuthToken().then((accessToken) => {
               
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
          
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(rssi);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})


