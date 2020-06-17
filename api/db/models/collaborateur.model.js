const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


// JWT Secret
const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfjd7148924065";

const CollaborateurSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    org: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    nom : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    ville : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    pays : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    cp : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    motivation: {
        type: String,
        // required: true,
        minlength: 1
    },
	has_invitation: {
        type: Boolean,
        required: true,
    },
	invitationId:{
		type: mongoose.Types.ObjectId,
	},
	has_workspace: {
        type: Boolean,
        required: true,
    },
	workspaceId:{
		type: mongoose.Types.ObjectId,
	},
    sous_taches: {
        type: Array
    },

    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});


// *** Instance methods ***

CollaborateurSchema.methods.toJSON = function () {
    const collaborateur = this;
    const collaborateurObject = collaborateur.toObject();

    // return the document except the password and sessions (these shouldn't be made available)
    return _.omit(collaborateurObject, ['password', 'sessions']);
}

CollaborateurSchema.methods.generateAccessAuthToken = function () {
    const collaborateur = this;
    return new Promise((resolve, reject) => {
        // Create the JSON Web Token and return that
        jwt.sign({ _id: collaborateur._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                // there is an error
                reject();
            }
        })
    })
}

//The following method will generate the refresh token 

CollaborateurSchema.methods.generateRefreshAuthToken = function () {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (!err) {
                // no error
                let token = buf.toString('hex');

                return resolve(token);
            }
        })
    })
}

CollaborateurSchema.methods.createSession = function () {
    let collaborateur = this;

    return collaborateur.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(collaborateur, refreshToken);}).then((refreshToken) => {
        // saved to database successfully
        // now return the refresh token
       // console.log(refreshToken);
        return refreshToken;
      
    }).catch((e) => {
        return Promise.reject('Failed to save session to database.\n' + e);
    })
}



/* MODEL METHODS (static methods) */

CollaborateurSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}



CollaborateurSchema.statics.findByIdAndToken = function (_id, token) {
    // finds collaborateur by id and token
    // used in auth middleware (verifySession)

    const Collaborateur = this;

    return Collaborateur.findOne({
        _id,
        'sessions.token': token
    });
}


CollaborateurSchema.statics.findByCredentials = function (email, password) {
    let Collaborateur = this;
    return Collaborateur.findOne({ email }).then((collaborateur) => {
        if (!collaborateur) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, collaborateur.password, (err, res) => {
                if (res) {
                    resolve(collaborateur);
                }
                else {
                    reject();
                }
            })
        })
    })
}

CollaborateurSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        // hasn't expired
        return false;
    } else {
        // has expired
        return true;
    }
}


/* MIDDLEWARE */
// Before a collaborateur document is saved, this code runs
CollaborateurSchema.pre('save', function (next) {
    let collaborateur = this;
    let costFactor = 10;

    if (collaborateur.isModified('password')) {
        // if the password field has been edited/changed then run this code.

        // Generate salt and hash password
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(collaborateur.password, salt, (err, hash) => {
                collaborateur.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});


/* HELPER METHODS */
let saveSessionToDatabase = (collaborateur, refreshToken) => {
    // Save session to database
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        collaborateur.sessions.push({ 'token': refreshToken, expiresAt });

        collaborateur.save().then(() => {
            // saved session successfully
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}

const Collaborateur = mongoose.model('Collaborateur', CollaborateurSchema);

module.exports = { Collaborateur }