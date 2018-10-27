import { Component, TemplateRef, ViewChildren, QueryList } from '@angular/core';

import { ITemplateLibrary } from '@gamesbyemail/base';
import { ITemplateSize } from '@gamesbyemail/base';
import { TemplateLibraryService } from '@gamesbyemail/base';

export interface IKey {
  type: 'Pawn' | 'Knight' | 'Bishop' | 'Rook' | 'Queen' | 'King';
  team: 'White' | 'Black';
  small?: boolean;
  resigned?: boolean;
}
@Component({
  selector: 'app-template-library',
  templateUrl: './template-library.component.html',
  styleUrls: ['./template-library.component.css']
})
export class PiecesComponent implements ITemplateLibrary {
  @ViewChildren(TemplateRef) templateRefs!: QueryList<TemplateRef<any>>;

  constructor(private templateLibraryService: TemplateLibraryService) {
  }

  getTemplate(key: IKey): TemplateRef<any> | undefined {
    return this.templateLibraryService.findTemplateById(this.templateRefs, key.type + key.team + (key.type === 'King' && key.resigned ? 'Resigned' : '') + (key.small ? 'Small' : ''));
  }
  getSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined {
    return this.templateLibraryService.getTemplateSize(template);
  }

}
