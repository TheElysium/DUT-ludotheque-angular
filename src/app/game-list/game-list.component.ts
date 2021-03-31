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

  getGameList(sort?: string, filters?: string[]): void{
    this.gameService.getGameList(sort, filters).subscribe(
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
    this.filterList = [];

    if(this.age.value != null){
      this.filterList.push(["age", this.age.value])
      this.gameList = this.gameList.filter((game:Game) => game.age <= this.age.value)
    }
    if(this.nombreJoueurs.value != null){
      this.filterList.push(["nbJoueurs", this.nombreJoueurs.value])
      this.gameList = this.gameList.filter((game:Game) => game.nombre_joueurs <= this.nombreJoueurs.value)
    }
    // if(this.editor.value != null) {
    //   this.filterList.push(["editeur", this.editor.value]);
    //   this.gameList = this.gameList.filter((game:Game) => game.editor <= this.editor.value)
    // }
    // if(this.theme.value != null) {
    //   this.filterList.push(["theme", this.theme.value]);
    //   this.gameList = this.gameList.filter((game:Game) => game.theme <= this.theme.value)
    // }
    //.....

    this.filterList.forEach(f => console.log(f));
    this.gameList.forEach(f => console.log(f));

    //Filtrage et tri coté API mais ne permet pas le filtrage multiple + le tri
    //this.getGameList(null, this.filterList);

  }

  sort(sortBy: string): void{
    //this.getGameList(sortBy,this.filterList);
    //this.filter();

    if(sortBy === "nom"){
      this.gameList = this.gameList.sort((a: Game, b: Game) => a.nom > b.nom ? 1:-1);
    }
    else if(sortBy === "note"){
      this.getGameList(sortBy);
    }
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
