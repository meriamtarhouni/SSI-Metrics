const express = require('express');
const app = express();

const { Rssi, Collaborateur, Workspace, Invitation } = require('./db/models');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const jwt = require('jsonwebtoken');
const checkListRouter=require('./routers/checkList');
/* MIDDLEWARE  */


// Load middleware
app.use(bodyParser.json());



// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token', 
     
    );  

    next();
});

app.use(checkListRouter);

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



// Verify Refresh Token Middleware (which will be verifying the session)
let verifySessionRssi = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');
   
    Rssi.findByIdAndToken(_id, refreshToken).then((rssi) => {
        if (!rssi) {
            // rssi couldn't be found
            return Promise.reject({
                'error': 'Rssi not found. Make sure that the refresh token and  id are correct'
            });
        }


        // The refresh token exists in the database - but we still have to check if it has expired or not

        req.rssi_id = rssi._id;
        req.rssiObject = rssi;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        rssi.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (Rssi.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}


// Verify Refresh Token Middleware (which will be verifying the Collaborator session )
let verifySessionCollaborateur = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');
   
    Collaborateur.findByIdAndToken(_id, refreshToken).then((collaborateur) => {
        if (!collaborateur) {
            // collaborateur couldn't be found
            return Promise.reject({
                'error': 'Collaborateur not found. Make sure that the refresh token and  id are correct'
            });
        }


        // The refresh token exists in the database - but we still have to check if it has expired or not

        req.collaborateur_id = collaborateur._id;
        req.collaborateurObject = collaborateur;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        collaborateur.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (Collaborateur.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
            
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}
/* END MIDDLEWARE  */



/* WORKSPACE ROUTES */

// Get all Workspaces
app.get('/workspaces', (req, res) => {
	console.log(req.body);
    Workspace.find({}).then((workspaces) => {
        res.send(workspaces);
    }).catch((e) => {
        res.send(e);
    });
})

// Create a workspace
app.post('/workspaces', authenticateRssi, (req, res) => {
    let newWorkspace = new Workspace({
		nom: req.body.nom,
		collaborateurs: req.body.collaborateurs,
		rssiId: req.body.rssiId,
	});
    newWorkspace.save().then((workspaceDoc) => {
        res.send(workspaceDoc);
    }).then(() => {
        res.sendStatus(200);
    }).catch((e) => {
		console.log(e);
        res.sendStatus(400);
    })
});

// Delete a workspace
app.delete('/workspaces/:rssiId/:id',authenticateRssi, (req, res) => {
  
    Workspace.findOneAndRemove({
        _id: req.params.id,
		rssiId: req.params.rssiId,
        
    }).then((removedWorkspaceDoc) => {
        res.send(removedWorkspaceDoc);
    })
});

//Get workspace credentials byId
app.get('/workspaces/:id',authenticateRssi,(req, res) => {
  
    Workspace.find({
        _id: req.params.id,
    }).then((workspace) => {
        res.send(workspace);
    })
});



/* RSSI ROUTES */

// Get all RSSIs
app.get('/rssis', (req, res) => {
    Rssi.find({}).then((rssis) => {
        res.send(rssis);
    }).catch((e) => {
        res.send(e);
    });
})

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
//Rssi get access token
app.get('/rssis/me/access-token', verifySessionRssi, (req, res) => {
    // we know that the caller is authenticated and we have the rssi_id and rssi  object available to us
    req.rssiObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})
//Rssi update
app.patch('/rssis/:id',authenticateRssi,(req, res) => {
    
    Rssi.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});

//Rssi delete
app.delete('/rssis/:id',authenticateRssi, (req, res) => {
  
    Rssi.findOneAndRemove({
        _id: req.params.id,
        
    }).then((removedRssiDoc) => {
        res.send(removedRssiDoc);
    })
});
//Get Rssi credentials by id
app.get('/rssis/:id',authenticateRssi,(req, res) => {
  
    Rssi.find({
        _id: req.params.id,
    }).then((rssi) => {
        res.send(rssi);
    })
});

//Verify whether the current Rssi already has a workspace
app.get('/rssis/:id/workspace',authenticateRssi,(req,res)=>{
   
   Workspace.find({
    rssiId:req.params.id,
   }).then((workspace)=>{
     if(workspace[0]==Array[0]){
        res.send(400);
      }
      else{
        res.send(workspace);
      }    
   })
})


/**
 * Inviting a collaborator to the workspace
 */
app.post('/rssis/invite/:id_c',authenticateRssi,(req,res)=>{
	Workspace.findOne({rssiId:req.rssi_id,}).then((workspace)=>{
		if(!workspace){
			res.status(400).send('Workspace not found');
		}
		else{
			Collaborateur.findById(req.params.id_c).then((collaborateur)=>{
				if(!collaborateur){
					res.status(400).send('Collaborator not found');
				}
				else if(collaborateur.has_workspace == true){
					res.status(400).send('Collaborator is already in a workspace');
				}
				else{
					let invitation = new Invitation({
						workspaceId: workspace._id,
						collaboratorId: collaborateur._id,
						accepted: false,
					});

					invitation.save().then((invitationDoc) => {
						Collaborateur.findByIdAndUpdate(invitation.collaboratorId, {
							has_invitation: true,
							invitationId: invitationDoc._id,
						}).then(() => {
							res.sendStatus(200);
						}).catch((e)=>{
							res.status(400).send(e);
						});
					}).then(() => {
						res.sendStatus(200);
					}).catch((e) => {
						res.status(400).send(e);
					})
				}
			})
		}    
   }).catch((e) => {
        res.status(400).send(e);
    });
})


/**
 * Remove collaborator from workspace
 */
app.patch('/rssis/remove_collaborator/:id_c',authenticateRssi, (req, res) => {
	Workspace.findOne({rssiId:req.rssi_id,}).then((workspace)=>{
		let workspaceId = workspace._id;
		if(!workspace){
			res.status(400).send('Workspace not found');
		}
		else{
			Collaborateur.findOne({id: req.params.id_c, has_workspace: true, workspaceId: workspaceId._id}).then((collaborateur)=>{
				let collabId = collaborateur._id;
				if(!collaborateur){
					res.status(400).send('Collaborator not found');
				}
				else{
					// remove collaborator from workspace's array
					Workspace.findByIdAndUpdate(workspaceId,{
						$push:{
							collaborateurs: collabId,
						},
					}).then(() => {
						res.sendStatus(200);
					}).catch((e)=>{
						res.status(400).send(e);
					});

					// update collaborator
					Collaborateur.findByIdAndUpdate(collabId, {
						has_workspace: false,
					}).then(() => {
						res.sendStatus(200);
					}).catch((e)=>{
						res.status(400).send(e);
					});
				}
			})
		}    
   }).catch((e) => {
        res.status(400).send(e);
    });
});



/* COLLABORATOR ROUTES */ 

// Get all Collaborateurs
app.get('/collaborateurs', (req, res) => {
    Collaborateur.find({}).then((collaborateurs) => {
        res.send(collaborateurs);
    }).catch((e) => {
        res.send(e);
    });
})

// Get all Collaborateurs from the same organization
app.get('/collaborateurs/org/:org', authenticateCollaborateur, (req, res) => {
	Collaborateur.find({org: req.params.org}).then((collaborateurs) => {
		res.send(collaborateurs);
	}).catch((e) => {
		res.status(400).send(e);
	});
})


/** Sign up 
 * 
 * POST /collaborateurs
 * 
 * */ 
app.post('/collaborateurs', (req,res)=>{
    let body = req.body;
    let newCollaborateur= new Collaborateur(body); 
	
	newCollaborateur.has_invitation = false;
	newCollaborateur.has_workspace = false;

    newCollaborateur.save().then(()=>{
        return newCollaborateur.createSession(); 
    }).then((refreshToken)=>{


        return newCollaborateur.generateAccessAuthToken().then((accessToken)=> {
            return { accessToken, refreshToken }

        }); 
    }).then((authTokens) => {
        
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newCollaborateur);
    }).catch((e) => {
        res.status(400).send(e);
    })
    
})


/**
 * login 
 * POST /collaborateurs
 * 
 */
app.post('/collaborateurs/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Collaborateur.findByCredentials(email, password).then((collaborateur) => {
        return collaborateur.createSession().then((refreshToken) => {
          

            return collaborateur.generateAccessAuthToken().then((accessToken) => {
               
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
          
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(collaborateur);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/**
 * PATCH /collaborateurs/:id
 * Purpose: Update a collaborator profile
 */
app.patch('/collaborateurs/:id',authenticateCollaborateur, (req, res) => {
    // We want to update the profile (collaborator document with id in the URL) with the new values specified in the JSON body of the request
    Collaborateur.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});

/**
 * DELETE /collaborateur/:id
 * Purpose: Delete a collaborator profile
 */

 
  
app.delete('/collaborateurs/:id',authenticateCollaborateur, (req, res) => {
    // We want to delete the specified list (document with id in the URL)
    Collaborateur.findOneAndRemove({
        _id: req.params.id
    }).then((removedCollaborateurDoc) => {
        res.send(removedCollaborateurDoc);
    })
});


/**
 * GET /collaborateurs
 * Purpose: Get all collaborators
 */0
app.get('/collaborateurs', authenticateCollaborateur, (req, res) => {
    // + authenticateRssi 
    //+ access org
    // We want to return an array of all the collaborators that belong to the organisation space  as the authenticates collaborator (Protecting API Routes - [11] premiers 10min)
    Collaborateur.find({}).then((collaborateurs) => {
        res.send(collaborateurs);
    }).catch((e) => {
        res.send(e);
    });
})



/**
 * get profil collaborateur 
 */

app.get('/collaborateurs/:collaborateurId',authenticateCollaborateur, (req, res) => {
    // We want to return the profile that belong to the authenticated collaborator 
    Collaborateur.find({ _id: req.params.collaborateurId})
    .then((collaborateur) => {
        res.send(collaborateur);
    }).catch((e) => {
        res.send(e);
    });
})


/**
 * get access token of the collaborator 
 */
app.get('/collaborateurs/collaborateur/access-token', verifySessionCollaborateur, (req, res) => {
    // we know that the caller is authenticated and we have the collaborateur_id and collaborateur  object available to us
    req.collaborateurObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/**
 * Accepting an invitation
 */
app.patch('/collaborateurs/accept_invite',authenticateCollaborateur,(req,res)=>{
    let id_invitation = '';
    Invitation.findOne({collaboratorId: req.collaborateur_id, accepted: false}).then((invitation)=>{
        if(!invitation){
            res.status(400).send('Invitation not found');
        }
        else{
            id_invitation = invitation._id;
        }
    })

	Collaborateur.findById(req.collaborateur_id).then((collaborateur)=>{
		if(!collaborateur){
            return Promise.reject({
                'error': 'Collaborator not found'
            });
		}

		let collabId = collaborateur._id;

		if(!collaborateur.has_invitation){
			res.status(400).send('Collaborator was not invited');
		}
		else if(id_invitation != collaborateur.invitationId){
			res.status(400).send('Invalid invitation id for this collaborator');
		}
		else{
			Invitation.findOne({_id:collaborateur.invitationId, collaboratorId: collabId, accepted: false}).then((invitation)=>{
				if(!invitation){
					res.status(400).send('Invitation not found');
				}
				else{
					// update collaborator
					Collaborateur.findByIdAndUpdate(collabId, {
						has_invitation: false,
						has_workspace: true,
						workspaceId: invitation.workspaceId,
					}).then(() => {
						res.send(200);
					}).catch(()=>{
						res.send(400);
					});

					// update accepted status of this invitation
					Invitation.findByIdAndUpdate(id_invitation, {
						accepted: true,
					}).then(() => {
						res.send(200);
					}).catch(()=>{
						res.send(400);
					});

					// add collab to workspace list
					Workspace.findByIdAndUpdate(invitation.workspaceId, {
						$push:{
							collaborateurs: collabId,
						},
					}).then(() => {
						res.send(200);
					}).catch(()=>{
						res.send(400);
					});
				}
			})
		}    
   }).catch((e) => {
        res.status(400).send(e);
    });
})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})
