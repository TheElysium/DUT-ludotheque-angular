import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import {Game} from "../game";
import {Observable} from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
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
