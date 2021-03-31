import {Component, Input, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";
import {Filter, Game, Sort} from "../game";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  public noCatString = 'Non catégorisé';
  @Input() game: Game;
  constructor(public route: ActivatedRoute, public gameService: GameService) { }

  ngOnInit(): void {
  }

}
