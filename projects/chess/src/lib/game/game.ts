import { BaseGame, IBaseGameSave, IBaseGameState } from '@gamesbyemail/base';
import { Board, IBoardSave } from './board';
import { Team, ITeamSave } from './team';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove, isIMove } from './move';

export interface IGameOptions {
  dark?:boolean;
}
export interface IGameState extends IBaseGameState<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  board: string;
  teams: string[];
  moves: Move[];
}

export interface IGameSave extends IBaseGameSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
}
export class Game extends BaseGame<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  constructor() {
    super();
    this._board = new Board(this);
    this._teams.push(new Team(this, TeamId.White), new Team(this, TeamId.Black));
    Object.freeze(this._teams);
  }

  public setState(state: IGameState) {
    super.setState(state);
    if (this.options.dark)
      this.board.setDark(this.findUsPlayer(true) || this.findUsPlayer());
    if (this.lastMoves.length > 0) {
      const move = this.lastMoves[0];
      if (isIMove(move)) {
        this.board.territories[move.from].highlight = true;
        this.board.territories[move.to].highlight = true;
      }
    }
  }

  public incrementTurn() {
    const turnTeam = this.findTurnTeam()!;
    const opponent = turnTeam.getOpponent()!;
    if (this.options.dark) {
      turnTeam.myTurn = false;
      if (this.board.anyKingsLeft(opponent))
        opponent.myTurn = true;
      else
        this._over=true;
    } else {
      const isInCheck = this.board.isInCheck(opponent);
      if (isInCheck)
        this.modLog({ inCheck: true });
      const canMove = this.board.canMove(opponent);
      if (!canMove)
        this.modLog({ canMove: false });
      turnTeam.myTurn = false;
      if (canMove) {
        opponent.myTurn = true;
        if (isInCheck) {
          console.log("CHECK");
        }
      } else {
        this._over=true;
        if (isInCheck) {
          console.log("CHECKMATE");
        }
        else {
          console.log("STALEMATE");
        }
      }
    }
    const state = this.commit();
    this.setState(state);
  }
}
