const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const WorkspaceSchema =  new mongoose.Schema({
   
    nom: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    collaborateurs: {
        type: Array
    },
	rssiId:{
		type: mongoose.Types.ObjectId,
		required: true,
        unique: true
	}
   
});

/*
// * A middelware that hashes the password
WorkspaceSchema.pre('save',function (next){
   let workspace = this;
   let costFactor = 10;

   if(workspace.isModified('password')) {
     // if the password field has been edited/changed then run this code.
    // Generate salt and hash password
    bcrypt.genSalt(costFactor, (err, salt) => {
        bcrypt.hash(workspace.password, salt, (err, hash) => {
            workspace.password = hash;
            next();
        })
    })

   } else {
       next();
   }
});
*/

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

module.exports = {  Workspace }