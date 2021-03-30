import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../game";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../game.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: Game;
  gameId: number;

  loading = false;

  constructor(public route: ActivatedRoute, public gameService: GameService, public messageService: MessageService, public router: Router) { }

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.gameService.getGameById(this.gameId).subscribe(
      game => {
        this.loading = true;
        this.game = game;
        console.log('Game details : ' + game);
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'L\'obtention des détails du jeu échouée'});
        this.router.navigate(['/home']);
      }
    );
  }


}
