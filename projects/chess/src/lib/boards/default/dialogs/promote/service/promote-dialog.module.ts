import { NgModule } from '@angular/core';

import { PromoteDialogService } from './promote-dialog.service';

import {
  SvgDialogModule,
  SvgDialogManifest,
} from '@packageforge/svg-dialog';

const manifests: SvgDialogManifest[] = [
  {
    componentId: 'gbe-games-chess-promote-dialog',
    path: 'gbe-games-chess-promote-dialog',
    loadChildren: './dialogs/promote/dialog/promote-dialog.module#PromoteDialogModule',
    //loadChildren: '../dialog/promote-dialog.module#PromoteDialogModule',
    size:{
      width:400,
      height:170
    }
  }
];

@NgModule({
  providers: [
    PromoteDialogService
  ],
  imports:[
    SvgDialogModule,
    SvgDialogModule.forRoot(manifests)
  ]
})
export class PromoteDialogModule {}
