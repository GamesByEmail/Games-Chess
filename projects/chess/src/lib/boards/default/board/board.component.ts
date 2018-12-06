import { Component, Input, ElementRef, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { trigger, state, style, animate, transition, sequence } from '@angular/animations';

import { BoardService } from '@gamesbyemail/base';
import { PromoteDialogService } from '../dialogs/promote/promote-dialog.service';

import { Territory } from '../../../game/territory';
import { Game } from '../../../game/game';
import { fromEvent, Subscription, Observable, Subject, race } from 'rxjs';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { Point2D, Rectangle2D } from '@packageforge/geometry2d';
import { PieceChar } from '../../../game/piece';

@Component({
  selector: 'gamesbyemail-games-chess-default-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger('showCheck', [
      state('false', style({ opacity: 1 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', sequence([
        animate("0.05s", style({ opacity: 0 })),
        animate("0.15s", style({ opacity: 0 })),
        animate("0.05s", style({ opacity: 1 })),
        animate("0.15s", style({ opacity: 1 })),
        animate("0.05s", style({ opacity: 0 })),
        animate("0.15s", style({ opacity: 0 })),
        animate("0.05s", style({ opacity: 1 })),
        animate("0.15s", style({ opacity: 1 })),
        animate("0.05s", style({ opacity: 0 })),
        animate("0.15s", style({ opacity: 0 })),
        animate("0.05s", style({ opacity: 1 }))
      ]))
    ])
  ]
})
export class BoardComponent implements AfterViewInit {
  @Input() game!: Game;
  @ViewChild('boardArea') boardArea!: ElementRef<SVGElement>;
  @ViewChild('dialogArea', { read: ViewContainerRef }) dialogArea!: ViewContainerRef;
  @ViewChild('templateLibrary') pieceLibrary!: any;

  mousemove: Observable<MouseEvent> = <any>fromEvent(document, 'mousemove');
  mouseup: Observable<any> = fromEvent(document, 'mouseup').pipe(map(() => undefined));
  territoryUp: Subject<Territory> = new Subject();

  constructor(private boardService: BoardService, private promoteDialogService: PromoteDialogService) { }
  subscription!: Subscription;
  ngAfterViewInit() {
    this.game.board.controller = this;
  }

  territoryMouseup(territory: Territory) {
    this.territoryUp.next(territory);
  }

  territoryMousedown(fromTerritory: Territory, md: MouseEvent) {
    if (this.game.over || !fromTerritory.piece || !fromTerritory.piece.isUs() || !fromTerritory.piece.team.myTurn)
      return;
    const target = <SVGElement>fromTerritory.piece.elementRef!.nativeElement;
    if (!target)
      return;
    this.game.beginningMove();
    this.game.save();
    this.boardService.moveToTopOfStack(target);
    const startRect = new Rectangle2D(target.getBoundingClientRect());
    const start = startRect.center();
    //const start = new Point2D(md.clientX, md.clientY);
    const startTrans = this.boardService.getTranslation(target);
    this.mousemove
      .pipe(map((mm) => {
        mm.preventDefault();
        return (new Point2D(mm.clientX, mm.clientY)).subtract(start);
      }))
      .pipe(takeUntil(race(this.mouseup, this.territoryUp)
        .pipe(map(toTerritory => {
          (toTerritory ? fromTerritory.piece!.attemptMove(toTerritory) : Promise.resolve(false)).then(suceeded => {
            if (suceeded)
              this.game.incrementTurn();
            else {
              this.game.restore();
              target.setAttribute("transform", "translate(" + startTrans.x + "," + startTrans.y + ")");
            }
          });
        }))
      ))
      .pipe(switchMap(pos => {
        return this.boardService.moveToRect(target, startRect.clone().translate(pos).constrainTo(this.boardArea.nativeElement.getBoundingClientRect()), 0);
      })).subscribe(() => {
        ;
      });
  }
  boardTransform(x: number, y: number, w: number, h: number) {
    let transform = "";
    const angle = this.game.board.rotation;
    transform += " translate(" + x + " " + y + ")";
    if (angle)
      transform += " rotate(" + angle + " " + (w / 2) + " " + (h / 2) + ")";
    return transform;
  }
  territoryTransform(territory: Territory, w: number, h: number, unrotate?: boolean): string {
    let transform = "";
    const x = territory.position.x * w;
    const y = (7 - territory.position.y) * h;
    transform += " translate(" + x + " " + y + ")";
    const angle = territory.board.rotation;
    if (unrotate && angle)
      transform += " rotate(-" + angle + " " + (w / 2) + " " + (h / 2) + ")";
    return transform;
  };
  classes(territory: Territory) {
    return {
      'movable': territory.piece && territory.piece.canMove(),
      'white': (territory.position.x + territory.position.y) % 2 === 0,
      'black': (territory.position.x + territory.position.y) % 2 === 1,
      'dark': territory.dark
    };
  }
  openPromote(teamColor: string): Promise<PieceChar | undefined> {
    return new Promise((resolve, reject) => {
      this.promoteDialogService.open(this.dialogArea, { pieceLibrary: this.pieceLibrary, teamColor: teamColor })
        .afterClosed()
        .subscribe(value => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        });
    });
  }
}
