export class Contact{
    id:number
    nom:string
    prenom:string
    email:string
    id_civilite:number

    constructor(id:number,nom:string,prenom:string,email:string,civilite:number) {
        this.id = id
        this.nom=nom
        this.prenom=prenom
        this.email=email
        this.id_civilite=civilite
    }
}