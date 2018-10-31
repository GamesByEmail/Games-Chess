import { Component, Input } from '@angular/core';
import { IGame } from '@gamesbyemail/base';

@Component({
  selector: 'gamesbyemail-games-chess-joinoptions',
  templateUrl: './join-options.component.html',
  styleUrls: ['./join-options.component.css']
})
export class JoinOptionsComponent {
  @Input('game') game!: IGame;
  dummy: any;

  optionChosen(optionName: string, value?: any): boolean {
    return value === undefined ? !!this.game.options[optionName] : this.game.options[optionName] === value;
  }
}
