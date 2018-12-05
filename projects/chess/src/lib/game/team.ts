import { IBaseTeamSave, BaseTeam } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';

import { Piece, PieceChar } from './piece';

export interface ITeamSave extends IBaseTeamSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  ccs: boolean;
  ccl: boolean;
  captures: Piece[];
}

export class Team extends BaseTeam<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  captures: Piece[] = [];
  ccl = true;
  ccs = true;
  constructor(game: Game, id: TeamId) {
    super(game, id);
  }
  capture(piece: Piece): void {
    piece.changeTerritory(undefined);
    this.captures.push(piece);
  }
  getOpponent(): Team {
    for (let i = 0; i < this.game.teams.length; i++)
      if (this.game.teams[i] !== this)
        return this.game.teams[i];
    throw "no opponent found";
  }
  getTitle(): string {
    return this.id === TeamId.Black ? "Black" : "White";
  }
  setState(state: string): string {
    state=super.setState(state);
    this.captures.length = 0;
    this.ccs = state.charAt(0) === 't';
    this.ccl = state.charAt(1) === 't';
    state = state.substr(2);
    while (state.length > 0) {
      const piece = this.game.board.createPiece(<PieceChar>state.substr(0, 1));
      state = state.substr(1);
      if (piece)
        this.captures.push(piece);
    }
    return state;
  }
  getState(): string {
    let state = super.getState();
    state += this.ccs ? "t" : "f";
    state += this.ccl ? "t" : "f";
    state += this.captures.map(piece => piece.getChar()).join("");
    return state;
  }
  save() {
    super.save();
    this.captures.forEach(capture => capture.save());
  }
  saving() {
    const saving = super.saving();
    saving.ccs = this.ccs;
    saving.ccl = this.ccl;
    saving.captures = this.captures.slice(0);
    return saving;
  }
  restore(depth: number) {
    super.restore(depth);
    this.captures.forEach(capture => capture.restore(depth));
  }
  restoring(saved: ITeamSave) {
    super.restoring(saved);
    this.ccs = saved.ccs;
    this.ccl = saved.ccl;
    this.captures = saved.captures;
  }
  commit() {
    super.commit();
    this.captures.forEach(capture => capture.commit());
  }
  beginningMove() {
    super.beginningMove();
    this.captures.forEach(capture => capture.beginningMove());
  }
}

