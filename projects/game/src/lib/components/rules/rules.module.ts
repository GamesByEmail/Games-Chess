import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateProjectionModule } from '@packageforge/template-projection';

import { RulesModule as BaseRulesModule } from '@gamesbyemail/base';

import { ChessBoardModule } from '../../boards/default/chess-board.module';

import { RulesComponent } from './rules.component';


@NgModule({
  imports: [
    CommonModule,
    BaseRulesModule,
    ChessBoardModule,
    TemplateProjectionModule
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
