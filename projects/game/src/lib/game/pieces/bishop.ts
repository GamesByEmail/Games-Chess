import { Territory } from '../territory';
import { Piece, PieceChar } from '../piece';

export class Bishop extends Piece {
  public static readonly pieceChar: PieceChar = 'b';
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    return delta.x !== 0 && Math.abs(delta.x) === Math.abs(delta.y) && this.territory!.pathIsClear(toTerritory);
  }
}
