import { Injectable, ViewContainerRef } from '@angular/core';
import { SvgDialogService } from '@packageforge/svg-dialog';
import { PieceChar } from '../../../../../game/piece';

@Injectable({
  providedIn: 'root'
})
export class PromoteDialogService {

  constructor(private svgDialogService: SvgDialogService) { }

  open(outlet: ViewContainerRef, data?: any) {
    return this.svgDialogService.open<PieceChar | undefined>(outlet, "gbe-games-chess-promote-dialog", data);
  }
}
