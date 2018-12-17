import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play.component';

import { ChessBoardModule } from '../../boards/default/chess-board.module';

@NgModule({
  imports: [
    CommonModule,
    ChessBoardModule
  ],
  declarations: [
    PlayComponent
  ],
  exports: [
    PlayComponent
  ]
})
export class PlayModule { }
