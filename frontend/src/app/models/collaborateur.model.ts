export class Collaborateur {
	_id: string;
	email: string;
	org: string;
	nom: string;
	ville: string;
	pays: string;
	cp: string;
	motivation: string;
	has_invitation: boolean;
	has_workspace: boolean;
	sous_taches: Array<string>;
}
