import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService } from '@packageforge/svg-dialog';
import { PromoteDialogComponent } from './promote-dialog.component';
import { PieceChar } from '../../../../game/piece';

@Injectable({
  providedIn: 'root'
})
export class PromoteDialogService {

  constructor(private svgDialogService: SvgDialogService) { }

  open(outlet: ViewContainerRef, data?: any, overlay?: ElementRef<SVGElement>) {
    return this.svgDialogService.open<PieceChar | undefined>(outlet, PromoteDialogComponent, data, overlay);
  }
}
