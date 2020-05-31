export class Sous_tache {
    _id: string; 
    label: String;
    etat : String;//["Pas mis en oeuvre","En cours","Terminé"]
    tache_id:string;
    date_debut: Date;
    date_fin:Date;
    clause: String;
    collaborateur_id: string; 
    exigence_id: string ; 
    phase_id: string ; 
    
}