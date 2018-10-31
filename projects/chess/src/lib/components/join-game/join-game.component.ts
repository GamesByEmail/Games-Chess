import { Component, Input } from '@angular/core';
import { IMe, IGame } from '@gamesbyemail/base';

@Component({
  selector: 'gamesbyemail-games-chess-joingame',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent {

  @Input() me!: IMe;
  @Input() game!:IGame;

  constructor() { }

}
