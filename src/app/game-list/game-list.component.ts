import {Component, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {Game, Sort} from "../game";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  gameList: Game[];
  sortState: number;

  filterForm: FormGroup = new FormGroup({
    age: new FormControl(undefined, [Validators.min(0)]),
    nombreJoueurs: new FormControl(undefined),
    theme: new FormControl(undefined),
    editeur: new FormControl(undefined),
  });


  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.getGameList();
    this.sortState = 0;
  }

  getGameList(sort?: string, filter?: string[]): void{
    this.gameService.getGameList(sort, filter).subscribe(
      (gameList: Game[]) => this.gameList = gameList
    );
  }

  filter(): void{
    console.log("Filtrage...");
    let filterList = []
    if(this.age.value != null){filterList.push(["age", this.age.value])}
    if(this.nombreJoueurs.value != null){filterList.push(["nbJoueurs", this.nombreJoueurs.value])}
    //.....

    filterList.forEach(f => console.log(f));
    this.getGameList(null, filterList);
  }

  sort(): void{
    console.log("Sorting ...");
    if(this.sortState == 0){
      console.log("BY nom ...");
      this.getGameList("nom");
    }
    else if(this.sortState == 1){
      console.log("BY rien ...");
      this.getGameList();
    }
    else if(this.sortState == 2){
      console.log("BY note ...");
      this.getGameList("note");
    }

    if(++this.sortState>2) this.sortState = 0;
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
