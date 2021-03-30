import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import {Filter, Game, Sort} from "../game";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  gameList: Game[];

  filterForm: FormGroup = new FormGroup({
    age: new FormControl(undefined, [Validators.min(0)]),
    nombreJoueurs: new FormControl(undefined),
    theme: new FormControl(undefined),
    editeur: new FormControl(undefined),
  });


  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.getGameList();
  }

  getGameList(sort?: Sort, filter?: Filter, filterParam?: string): void{
    this.gameService.getGameList(sort, filter, filterParam).subscribe(
      (gameList: Game[]) => this.gameList = gameList
    )
  }

  filter(): void{
    
  }

  get age(){
    return this.filterForm.get('age');
  }

  get nombreJoueurs(){
    return this.filterForm.get('nombreJoueurs');
  }

  get theme(){
    return this.filterForm.get('theme');
  }

  get editeur(){
    return this.filterForm.get('editeurs');
  }

}
