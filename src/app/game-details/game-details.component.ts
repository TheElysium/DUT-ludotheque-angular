import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../game';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../game.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: Game;
  gameId: number;

  mechanics = ['meca1', 'meca2']; // TO-DO get mechanics from the API

  loading = false;

  constructor(public route: ActivatedRoute, public gameService: GameService, public messageService: MessageService, public router: Router) {

  }

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    console.log('Requested game details id : ' + this.gameId);
    this.gameService.getGameById(this.gameId).subscribe(
      game => {
        this.loading = true;
        this.game = game;
        console.log(game);
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'L\'obtention des détails du jeu échouée'});
        this.router.navigate(['/home']);
      }
    );
  }


}
