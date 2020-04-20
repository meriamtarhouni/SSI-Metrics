const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

//JWT random Secret
const jwtSecret = "83164113920567714385beujfsbfeaabzuibgfeuig1539597337";

const RssiSchema =  new mongoose.Schema({
   
    nom: {
        type: String,
        required: true,
        minlength: 1
    },
   
    raison: {
        type: String,
        required: true,
        minlength: 1

    },
    adresse: {
        type: String,
        required: true,
        minlength: 1

    },
    code: {
        type: String,
        required: true,
        minlength: 1,
        unique: true

    },
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
        minlength: 5
    },
   //Session Objects contain a refresh token and its expiry dateTime (in the form of a unix timestamp)
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

//Override the toJSON method , we shouldn't return the password and sessions
RssiSchema.methods.toJSON = function(){
  const rssi = this;
  const rssiObject = rssi.toObject();
  return _.omit(rssiObject, ['password', 'sessions']);
}

//The following method will generate an access token 
RssiSchema.methods.generateAccessAuthToken = function(){
  const rssi = this;
  return new Promise((resolve, reject) => {
    // Create the JSON Web Token and return that
    jwt.sign({ _id: rssi._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
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
RssiSchema.methods.generateRefreshAuthToken = function () {
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



//The following method will create a session
RssiSchema.methods.createSession = function() {
  
  let rssi = this;
  return rssi.generateRefreshAuthToken().then((refreshToken) => {
         return saveSessionToDatabase(rssi, refreshToken);}).then((refreshToken) => {
           // saved to database successfully
          // now return the refresh token
          return refreshToken;
      }).catch((e) => {
     return Promise.reject('Failed to save session to database.\n' + e);
 })
}

// **Model methods => Statics methods

RssiSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}


RssiSchema.statics.findByIdAndToken = function(_id, token) {
    const Rssi= this;

    return Rssi.findOne({
        _id,
        'sessions.token': token
    });
}

RssiSchema.statics.findByCredentials = function (email,password) {
  
    let Rssi = this;
    return Rssi.findOne({ email }).then((rssi) => {
        if (!rssi) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, rssi.password, (err, res) => {
                if (res) {
                    resolve(rssi);
                }
                else {
                    reject();
                }
            })
        })
    })


}

RssiSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        // hasn't expired
        return false;
    } else {
        // has expired
        return true;
    }
}

// * A middelware that hashes the password
RssiSchema.pre('save',function (next){
   let rssi = this;
   let costFactor = 10;

   if(rssi.isModified('password')) {
     // if the password field has been edited/changed then run this code.
    // Generate salt and hash password
    bcrypt.genSalt(costFactor, (err, salt) => {
        bcrypt.hash(rssi.password, salt, (err, hash) => {
            rssi.password = hash;
            next();
        })
    })

   } else {
       next();
   }
});



// ***Helpers methods***

//Session = Refresh Token + Expiry Time
let saveSessionToDatabase = (rssi , refreshToken) => {
  //save Session to database
  return new Promise((resolve, reject) => {
    let expiresAt = generateRefreshTokenExpiryTime();
    rssi.sessions.push({'token' : refreshToken, expiresAt});
    rssi.save().then(() => {
        // saved session successfully
        return resolve(refreshToken);
    }).catch((e) => {
        reject(e);
    });

  })

}



//Expiry Time
let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}


const Rssi = mongoose.model('Rssi', RssiSchema);

module.exports = {  Rssi }