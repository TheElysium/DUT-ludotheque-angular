 export class Game{

  constructor(public id: number,public nom: string,public  description: string,public  regles: string,public  langue: string,
              public url_media: string, public  age: number,public  poids: number,public  nombreJoueurs: number,
              public categorie: string, public duree: string, public theme_id:number, public editeur_id:number) {}

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
      json['nombreJoueurs'],
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
