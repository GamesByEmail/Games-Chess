import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule, MatExpansionModule } from '@angular/material';

import { StartGameModule as BaseStartGameModule, OptionTitleModule } from '@gamesbyemail/base';

import { StartGameComponent } from './start-game.component';
import { StartOptionsComponent } from './start-options/start-options.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseStartGameModule,
    OptionTitleModule,
    MatExpansionModule,
    MatRadioModule
  ],
  declarations: [
    StartGameComponent,
    StartOptionsComponent
  ],
  exports: [
    StartGameComponent
  ]
})
export class StartGameModule {
}
