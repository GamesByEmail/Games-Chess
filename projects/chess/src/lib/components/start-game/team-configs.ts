import { IPlayer } from '@gamesbyemail/base';
import { ITeamConfig } from '@gamesbyemail/base';

const players: IPlayer[] = [
  {
    user: undefined
  },
  {
    user: undefined
  }
];

export const teamConfigs: ITeamConfig[] = [
  {
    teams: [
      {
        title: "White",
        player: players[0]
      },
      {
        title: "Black",
        player: players[1]
      }
    ],
    optionNames:[
      "dark"
    ]
  }
];
