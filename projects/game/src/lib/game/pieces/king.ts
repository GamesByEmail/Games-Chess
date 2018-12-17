import { Territory } from '../territory';
import { Piece, PieceChar } from '../piece';
import { TeamId } from '../team-id';
import { Team } from '../team';
import { Rook } from './rook';

export class King extends Piece {
  public static readonly pieceChar: PieceChar = 'k';
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    if (Math.abs(delta.x) === 2 && delta.y === 0)
      return (delta.x < 0 ? this.team.ccl : this.team.ccs) &&
        this.territory!.position.equals(4, this.team.id === TeamId.White ? 0 : 7) &&
        this.castlebleRook(delta.x < 0 ? 0 : 7, this.territory!.position.y, this.territory!, this.team) !== undefined &&
        !this.territory!.isThreatened(this.team) &&
        !this.territory!.board.findTerritory(this.territory!.position.x + (delta.x < 0 ? -1 : 1), this.territory!.position.y)!.isThreatened(this.team);
    return Math.abs(delta.x) <= 1 && Math.abs(delta.y) <= 1;
  }
  castlebleRook(x: number, y: number, fromT: Territory, team: Team): Rook | undefined {
    const rookT = this.territory!.board.findTerritory(x, y)!;
    const rook = rookT.piece;
    return rook !== undefined && (rook instanceof Rook) && rook.team === team && fromT.pathIsClear(rookT) ? rook : undefined
  }
  completeMove(fromTerritory: Territory): Promise<boolean> {
    return super.completeMove(fromTerritory).then(completed => {
      if (completed) {
        const delta = fromTerritory.delta(this.territory!);
        if (Math.abs(delta.x) == 2) {
          this.castlebleRook(delta.x < 0 ? 0 : 7, this.territory!.position.y, this.territory!, this.team)!.changeTerritory(this.territory!.board.findTerritory(fromTerritory.position.x + (delta.x < 0 ? -1 : 1), fromTerritory.position.y));
          this.game.modLog({ castle: delta.x < 0 ? "long" : "short" });
        }
        this.team.ccs = this.team.ccl = false;
      }
      return completed;
    });
  }
}
