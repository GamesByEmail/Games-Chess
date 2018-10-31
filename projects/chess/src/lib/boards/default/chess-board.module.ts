import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board/board.component';
import { PiecesComponent } from './pieces/pieces.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BoardComponent,
    PiecesComponent
  ],
  exports: [
    BoardComponent,
    PiecesComponent
  ]
})
export class ChessBoardModule {
}
