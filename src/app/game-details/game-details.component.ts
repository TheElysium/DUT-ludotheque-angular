import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../game';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../game.service';
import {MessageService} from 'primeng/api';
import {Commentaire} from "../_models/commentaires";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {AuthentificationService} from "../_services/authentification.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: Game;
  gameId: number;
  commentaireGame: Commentaire[];

  mechanics = ['meca1', 'meca2']; // TODO get mechanics from the API

  loading = false;


  formulaire: FormGroup = new FormGroup({
    commentaire: new FormControl(undefined, [Validators.required]),
    note: new FormControl(undefined, [Validators.required, Validators.min(0), Validators.max(5)]),
  })

  constructor(public route: ActivatedRoute, public gameService: GameService, public messageService: MessageService, public authService: AuthentificationService,public router: Router) {

  }

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    console.log('Requested game details id : ' + this.gameId);
    this.gameService.getGameById(this.gameId).subscribe(
      game => {
        this.loading = true;
        this.game = game;
        this.commentaireGame = game.commentaires;
        console.log(game);
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'L\'obtention des détails du jeu échouée'});
        this.router.navigate(['/home']);
      }
    );
  }

  onSubmit() {
    console.log("Submit comment...");
    const datePipe: DatePipe = new DatePipe('yyyy-dd-mm hh:mm:ss');
    if (this.formulaire.valid) {
      let c: Commentaire = {
        id: this.commentaireGame[this.commentaireGame.length-1].id+1,
        note: this.note.value,
        commentaire: this.commentaire.value,
        jeu_id: this.gameId,
        date_com: datePipe.transform(new Date()),
        user: this.authService.userValue,
      }
      this.gameService.postComment(c);
      this.messageService.add({summary: 'Reussite', detail: 'Votre commentaire a bien été posté !'});
    }
  }

  get commentaire(){
    return this.formulaire.get('commentaire');
  }

  get note(){
    return this.formulaire.get('note');
  }
}
