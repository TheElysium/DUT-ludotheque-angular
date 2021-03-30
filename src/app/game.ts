 export class Game{

  constructor(public id: number,public nom: string,public  description: string,public  regles: string,public  langue: string,
              public url_media: string, public  age: number,public  poids: number,public  nombre_joueurs: number,
              public categorie: string, public duree: string, public theme_id: theme_id, public editeur_id: editeur_id) {}

  //Create game from JSON
  public static fromJson(json: Object): Game{
    return new Game(
      json['id'],
      json['nom'],
      json['description'],
      json['regles'],
      json['langue'],
      json['url_media'],
      json['age'],
      json['poids'],
      json['nombre_joueurs'],
      json['categorie'],
      json['duree'],
      json['theme_id'],
      json['editeur_id']
    );
  }
}

export enum Filter{
  NONE,
  user,
  age,
  editeur,
  theme,
}

export enum Sort{
  NONE,
  note,
  nom,
}

 export interface theme_id{
  id: number;
  nom: string;
  }

 export interface tarif{
   prixMax: number;
   prixMin: number;
   prixMoyen: number;
 }

 export interface editeur_id{
  id: number;
  nom: string;
 }

 export interface statistiques{
  noteMax: number;
  noteMin: number;
  noteMoyenne: number;
  nbCommentaires: number;
  nbCommentairesTotal: number;
  rang: number;
  nbJeuxTheme: number;
 }

