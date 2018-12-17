import { IBaseTerritorySave, BaseGridTerritory, Player } from '@gamesbyemail/base';
import { Point2D } from '@packageforge/geometry2d';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Team, ITeamSave } from './team';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';

import { Piece, PieceChar } from './piece';

export interface ITerritorySave extends IBaseTerritorySave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  highlight: boolean;
  dark:boolean;
  piece: Piece | undefined;
}

const columns=['a','b','c','d','e','f','g','h'];
const ranks=['1','2','3','4','5','6','7','8'];

export class Territory extends BaseGridTerritory<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  private _piece: Piece | undefined;
  public get piece() {
    return this._piece;
  }
  constructor(board: Board, index: number) {
    super(board, index);
  }
  setPiece(piece?: Piece) {
    this._piece = piece;
  }
  public highlight = false;
  public dark = false;
  public get title(): string {
    return columns[this.position.x]+ranks[this.position.y];
  }
  clearFlags(team?: Team): void {
    super.clearFlags(team);
    this.highlight = false;
  }
  setState(state: string): string {
    const pieceChar: PieceChar | ' ' = <PieceChar | ' '>state.substr(0, 1);
    state = state.substr(1);
    const piece = pieceChar !== " " ? this.board.createPiece(pieceChar) : undefined;
    if (piece)
      piece.changeTerritory(this);
    else
      this.setPiece();
    return state;
  }
  getState():string {
    return this.piece ? this.piece.getChar() : " ";
  }
  save() {
    super.save();
    this.piece && this.piece.save();
  }
  saving(): ITerritorySave {
    const saving = super.saving();
    saving.highlight = this.highlight;
    saving.dark = this.dark;
    saving.piece = this.piece;
    return saving;
  }
  restore(depth: number) {
    super.restore(depth);
    this.piece && this.piece.restore(depth);
  }
  restoring(saved: ITerritorySave) {
    super.restoring(saved);
    this.highlight = saved.highlight;
    this.dark = saved.dark;
    this._piece = saved.piece;
  }
  commit() {
    super.commit();
    this.piece && this.piece.commit();
  }

  delta(toTerritory: Territory): Point2D {
    return toTerritory.position.clone().subtract(this.position);
  }
  pathIsClear(toTerritory: Territory): boolean {
    const step = this.delta(toTerritory).stepify();
    const position = this.position.clone().add(step);
    while (!position.equals(toTerritory.position))
      if (!this.board.findTerritory(position)!.isEmpty())
        return false;
      else
        position.add(step);
    return true;
  }
  isEmpty(): boolean {
    return this.piece === undefined;
  }
  isEnemy(ofPiece: Piece): boolean {
    return this.piece !== undefined && this.piece.team.id !== ofPiece.team.id;
  }
  isFriendly(ofPiece: Piece): boolean {
    return this.piece !== undefined && this.piece.team.id === ofPiece.team.id;
  }
  isThreatened(friendy: Team){
    return this.board.territoryThreats(this,friendy).length>0;
  }
  isUs(team?:Team){
    return team ? this.piece && this.piece.team===team : this.piece && this.piece.team.isUs;
  }
  beginningMove() {
    super.beginningMove();
    this.highlight = false;
    this.piece && this.piece.beginningMove();
  }
  setDark(player: Player<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> | undefined) {
    let dark=true;
    if (player)
      if (this.isUs(player.team))
        dark=false;
      else
        for (let i = 0; i < this.board.territories.length; i++) {
          const territory=this.board.territories[i];
          if (territory.isUs(player.team) && territory.piece!.canMoveTo(this,true)) {
            dark=false;
            break;
          }
        }
    this.dark=dark;
  }
}
