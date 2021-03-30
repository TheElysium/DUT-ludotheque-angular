import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import {Game} from "../game";
import {Observable} from "rxjs";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class LandingPageComponent implements OnInit {

  gameList: Game[];
  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.getGameList();
  }

  getGameList(): void{
    this.gameService.getGameList().subscribe(
      (gameList: Game[]) => this.gameList = gameList
    )
  }

}
