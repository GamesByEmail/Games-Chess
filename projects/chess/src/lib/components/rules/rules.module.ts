import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesModule as BaseRulesModule, RemoteTemplateModule } from '@gamesbyemail/base';

import { ChessBoardModule } from '../../boards/default/chess-board.module';

import { RulesComponent } from './rules.component';


@NgModule({
  imports: [
    CommonModule,
    BaseRulesModule,
    ChessBoardModule,
    RemoteTemplateModule
  ],
  declarations: [
    RulesComponent
  ],
  exports: [
    RulesComponent
  ]
})
export class RulesModule {
}
