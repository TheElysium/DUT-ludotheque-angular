export class Game{

  constructor(public nom: string,public  description: string,public  regles: string,public  langue: string, public url_media: string, public  age: number,public  poids: number,public  nombreJoueurs: number, public categorie: string, public duree: string) {}

  //Create game from JSON
  public static fromJson(json: Object): Game{
    return new Game(
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
    );
  }
}
