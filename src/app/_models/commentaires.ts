import {User} from "./user";

export interface Commentaire {
  id: number;
  commentaire: string;
  date_com: string;
  note: number;
  jeu_id: number;
  user: User;
}
