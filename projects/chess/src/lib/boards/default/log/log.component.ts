import { Component, Input, TemplateRef } from '@angular/core';
import { Game } from '../../../game/game';

@Component({
  selector: 'gamesbyemail-games-chess-default-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  @Input() game!: Game;
  @Input() pieces!: TemplateRef<any>;

  constructor() { }

  gridArea(index:number,asdf?:boolean):string {
    const row=Math.floor((index+1)/2)+1;
    const col=asdf ? 1 : index===0 ? 2 : (index+1)%2+2;
    return row+" / "+col;
  }
}
