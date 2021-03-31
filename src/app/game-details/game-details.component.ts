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
import {CommentaireService} from "../_services/commentaire.service";

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

  constructor(public route: ActivatedRoute, public gameService: GameService, public messageService: MessageService, public commentaireService: CommentaireService, public authService: AuthentificationService, public datepipe: DatePipe
  , public router: Router) {

  }

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    console.log('Requested game details id : ' + this.gameId);
    this.getGameById();
  }

  onSubmit() {
    let date = new Date();
    let dateString = this.datepipe.transform(date, 'yyyy-dd-mm hh:mm:ss')
    if (this.formulaire.valid) {
      console.log("Submit comment...");
      this.commentaireService.postComment(this.note.value, this.commentaire.value, this.gameId, dateString).subscribe(resp => console.log(resp));
      this.getGameById();
    }
  }

  get commentaire(){
    return this.formulaire.get('commentaire');
  }

  get note(){
    return this.formulaire.get('note');
  }

  getGameById(){
    this.gameService.getGameById(this.gameId).subscribe(
      game => {
        this.loading = true;
        this.game = game;
        this.commentaireGame = game.commentaires;
        console.log(game);
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'L\'obtention des détails du jeu échouée'});
        this.router.navigate(['/games']);
      }
    );
  }
}
