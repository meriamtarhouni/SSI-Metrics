const mongoose = require('mongoose');

const InvitationSchema =  new mongoose.Schema({
   
    workspaceId: {
        type: mongoose.Types.ObjectId,
		required: true,
    },
	collaboratorId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	accepted: {
		type: Boolean,
		required: true,
	}
   
});

const Invitation = mongoose.model('Invitation', InvitationSchema);

module.exports = {  Invitation }