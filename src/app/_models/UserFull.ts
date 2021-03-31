import {GameFull} from './gameFull';

export interface UserFull {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  jeux: GameFull[];
}
