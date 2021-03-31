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
  styleUrls: ['./game-list.component.css', '../app.component.css']
})
export class GameListComponent implements OnInit {

  gameList: Game[];
  sortState: number;
  editors: Editor[];
  themes: Editor[];
  filterList;


  filterForm: FormGroup = new FormGroup({
    age: new FormControl(undefined, [Validators.min(0)]),
    nombreJoueurs: new FormControl(undefined, [Validators.min(0)]),
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
    // this.filterList = [];

    console.log(this.theme.value);
    if(this.age.value != null){
      console.log("filtrage par age");
      // this.filterList.push(["age", this.age.value])
      this.gameList = this.gameList.filter((game:Game) => game.age <= this.age.value)
    }
    if(this.nombreJoueurs.value != null){
      console.log("filtrage par nbJoueurs");
      // this.filterList.push(["nbJoueurs", this.nombreJoueurs.value])
      this.gameList = this.gameList.filter((game:Game) => game.nombre_joueurs <= this.nombreJoueurs.value)
    }
    if(this.editor.value != null) {
      console.log("filtrage par editeur");
      // this.filterList.push(["editeur", this.editor.value]);
      this.gameList = this.gameList.filter((game:Game) => game.editeur_id.id === this.editor.value)
    }
    if(this.theme.value != null) {
      console.log("filtrage par theme");
      // this.filterList.push(["theme", this.theme.value]);
      this.gameList = this.gameList.filter((game:Game) => game.theme_id.id === this.theme.value)
    }
    // .....


    //Filtrage et coté API mais ne permet pas le filtrage multiple
    //this.getGameList(null, this.filterList);

  }

  sort(sortBy: string): void{
    //Tri coté API mais ne permet pas de faire un tri sur une liste filtrée
    //this.getGameList(sortBy);

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
    return this.filterForm.get('editeur');
  }




}
