import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SvgDialogModule } from '@packageforge/svg-dialog';
import { TemplateProjectionModule } from '@packageforge/template-projection';
import { PromoteDialogComponent } from './promote-dialog.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    PromoteDialogComponent,
  ],
  imports: [
    TemplateProjectionModule,
    MatButtonModule,
    SvgDialogModule.forChild(PromoteDialogComponent)
  ],
  schemas:[
    NO_ERRORS_SCHEMA
  ]
})
export class PromoteDialogModule {}
