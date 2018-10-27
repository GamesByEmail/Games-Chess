import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule, MatIconModule } from '@angular/material';
import { StartGameModule,IconModule,OptionTitleModule } from '@gamesbyemail/base';
import { StartGameComponent } from './components/start-game/start-game.component';
import { StartGameOptionsComponent } from './components/start-game-options/start-game-options.component';
import { PiecesComponent } from './boards/default/pieces/pieces.component';
import { BoardComponent } from './boards/default/board/board.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatIconModule,
    StartGameModule,
    IconModule,
    OptionTitleModule
  ],
  declarations: [
    StartGameComponent,
    StartGameOptionsComponent,
    PiecesComponent,
    BoardComponent
  ],
  exports: [
    StartGameComponent
  ],
  entryComponents: [
    StartGameComponent
  ]
})
export class ChessModule { }
