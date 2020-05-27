const {Rssi} = require('./rssi.model');
const { Collaborateur} =require ('./collaborateur.model');
const { Workspace } = require('./workspace.model');
const { Invitation } = require('./invitation.model');
const { Phase} =require('./phase.model');
const {Exigence}=require('./exigence.model');
const {Tache}=require('./tache.model');
const {Sous_tache}=require('./sous-tache.model');

module.exports = {
    Rssi,
    Collaborateur,
	Workspace,
	Invitation,
    Phase,
    Exigence,
    Tache,
    Sous_tache
}