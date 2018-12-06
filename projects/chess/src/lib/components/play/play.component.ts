import { Component, OnInit } from '@angular/core';
import { Game } from '../../game/game';

@Component({
  selector: 'gamesbyemail-games-chess-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  game: Game = new Game();
  constructor() {
  }

  ngOnInit() {
    const gameData = {
      over: false,
      players: [
        { title: "David", id: "ASDFASDF" },
        { title: "Jennifer", id: "ASDFASDF" }
      ],
      options: {
        dark: false
      },
      states: [
        {
          moveNumber: 0,
          //board:"rnbqkbnrpppppppp                                q  r r      K   ",
          //board:"rnbqkbnrpppppppp                                pPPPPPPPRNBQKBNR",
          //board:"r   k  rpppppppp                            p   PPPPPPPPR   K  R",
          board: "rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR",
          teams: [
            '@tt',
            'tt'
          ],
          moves: []
        }
      ]
    };
    this.game.setGameData(gameData);
  }

}
