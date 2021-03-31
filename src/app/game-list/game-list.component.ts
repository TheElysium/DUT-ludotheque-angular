import {Component, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {Game, Sort} from "../game";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditorService} from "../editor.service";
import {ThemeService} from "../theme.service";
import {Editor} from "../editor";
import {Theme} from "../theme";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  gameList: Game[];
  sortState: number;
  editors: Editor[];
  themes: Editor[];
  filterList;


  filterForm: FormGroup = new FormGroup({
    age: new FormControl(undefined, [Validators.min(0)]),
    nombreJoueurs: new FormControl(undefined),
    theme: new FormControl(undefined),
    editeur: new FormControl(undefined),
  });


  constructor(public gameService: GameService, public editorService: EditorService, public themeService: ThemeService) { }

  ngOnInit(): void {
    this.getGameList();
    this.getThemes();
    this.getEditors();
    this.sortState = 0;
    this.filterList = [];
    console.log(this.editors);

  }

  getGameList(sort?: string, filter?: string[]): void{
    this.gameService.getGameList(sort, filter).subscribe(
      (gameList: Game[]) => this.gameList = gameList
    );
  }

  getEditors(): void{
    this.editorService.getEditors().subscribe(
      (editors: Editor[]) => this.editors = editors)
  };

  getThemes(): void{
    this.themeService.getThemes().subscribe(
      (themes: Theme[]) => this.themes = themes)
  }

  filter(): void{
    console.log("Filtrage...");
    if(this.age.value != null){this.filterList.push(["age", this.age.value])}
    if(this.nombreJoueurs.value != null){this.filterList.push(["nbJoueurs", this.nombreJoueurs.value])}
    //.....

    this.filterList.forEach(f => console.log(f));
    this.getGameList(null, this.filterList);
  }

  sort(sortBy: string): void{
    // console.log("Sorting ...");
    // if(this.sortState == 0){
    //   console.log("BY nom ...");
    //   this.getGameList("nom", this.filterList);
    // }
    // else if(this.sortState == 1){
    //   console.log("BY rien ...");
    //   this.getGameList(undefined, this.filterList);
    // }
    // else if(this.sortState == 2){
    //   console.log("BY note ...");
    //   this.getGameList("note", this.filterList);
    // }
    //
    // if(++this.sortState>2) this.sortState = 0;
    this.getGameList(sortBy,this.filterList);
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

  get editor(){
    return this.filterForm.get('editor');
  }




}
