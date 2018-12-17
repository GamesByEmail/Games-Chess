import { Territory } from '../territory';
import { Piece, PieceChar } from '../piece';
import { TeamId } from '../team-id';

export class Rook extends Piece {
  public static readonly pieceChar: PieceChar = 'r';
  getHomeRank(): number {
    return this.team.id === TeamId.Black ? 7 : 0;
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    return (delta.x === 0 || delta.y === 0) && this.territory!.pathIsClear(toTerritory);
  }
  completeMove(fromTerritory: Territory): Promise<boolean> {
    return super.completeMove(fromTerritory).then(completed => {
      if (completed && fromTerritory.position.y === this.getHomeRank()) {
        if (fromTerritory.position.x === 0)
          this.team.ccl = false;
        if (fromTerritory.position.x === 7)
          this.team.ccs = false;
      }
      return completed;
    });
  }

}
