const mongoose = require('mongoose');

const WorkspaceSchema =  new mongoose.Schema({
   
    nom: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
	rssiId:{
		type: mongoose.Types.ObjectId,
		// required: true,        // NEEDS A FIX
	}
   
});


const Workspace = mongoose.model('Workspace', WorkspaceSchema);

module.exports = {  Workspace }