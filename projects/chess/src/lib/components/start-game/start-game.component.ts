import { Component, Input } from '@angular/core';
import { teamConfigs } from './team-configs';
import { IMe, ITeamConfig } from '@gamesbyemail/base';

@Component({
  selector: 'gamesbyemail-games-chess-startgame',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {

  teamConfigs: ITeamConfig[] = teamConfigs;
  @Input() me!: IMe;

}
