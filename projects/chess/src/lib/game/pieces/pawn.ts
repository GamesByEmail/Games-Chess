import { Territory } from '../territory';
import { Piece, IPieceSave, PieceChar } from '../piece';
import { isIMove } from '../move';
import { TeamId } from '../team-id';

export class Pawn extends Piece {
  public static readonly pieceChar: PieceChar = 'p';
  getHomeRank(): number {
    return this.team.id === TeamId.Black ? 6 : 1;
  }
  getPromoteRank(): number {
    return this.team.id === TeamId.Black ? 0 : 7;
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    if (darkTest && Math.abs(delta.x) === 1 && delta.y === 0 && toTerritory.isEnemy(this) && toTerritory.piece instanceof Pawn && toTerritory.piece.passedLastTurn())
      return true;
    if (this.team.id === TeamId.Black)
      delta.y *= -1;
    if (delta.y <= 0)
      return false;
    if (delta.x === 0)
      return (darkTest || toTerritory.isEmpty()) && (delta.y === 1 || (delta.y == 2 && this.territory!.position.y === this.getHomeRank() && this.territory!.pathIsClear(toTerritory)));
    if (Math.abs(delta.x) === 1 && delta.y === 1) {
      if (darkTest || toTerritory.isEnemy(this))
        return true;
      const passedT = this.territory!.board.findTerritory(toTerritory.position.x, this.territory!.position.y)!;
      if (passedT.isEnemy(this) && passedT.piece instanceof Pawn && passedT.piece.passedLastTurn())
        return true;
    }
    return false;
  }
  passedLastTurn(): boolean {
    if (this.game.lastMoves.length > 0) {
      const move = this.game.lastMoves[0];
      if (isIMove(move))
        return move.to === this.territory!.index && Math.abs(this.territory!.board.territories[move.from].position.y - this.territory!.position.y) === 2;
    }
    return false;
  }
  getCapture(toTerritory: Territory): Piece | undefined {
    let piece = super.getCapture(toTerritory);
    if (!piece && this.territory!.position.x !== toTerritory.position.x)
      piece = this.territory!.board.findTerritory(toTerritory.position.x, this.territory!.position.y)!.piece;
    return piece;
  }
  completeMove(fromTerritory: Territory): Promise<boolean> {
    return super.completeMove(fromTerritory).then(completed => {
      if (completed && this.territory!.position.y === this.getPromoteRank())
        return this.territory!.board.openPromote(this.team.id).then(newPieceType => {
          if (!newPieceType)
            return false;
          const replacement = this.territory!.board.createPiece(this.team.id === TeamId.Black ? <PieceChar>newPieceType.toUpperCase() : newPieceType)!;
          this.replaceWith(replacement);
          this.game.modLog({ promote: replacement.getChar() });
          return true;
        });
      return completed;
    });
  }
}

interface IPawnSave extends IPieceSave {
  passingLastTurn: boolean;
}