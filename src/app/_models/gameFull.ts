import {Game} from '../game';
import {CustomDatePipe} from '../custome.datepipe';

export interface GameFull{
  jeu: Game;
  lieu: string;
  date_achat: CustomDatePipe;
  prix: number;
}


