import { Component, TemplateRef, ViewChildren, QueryList } from '@angular/core';

import { ITemplateLibrary } from '@gamesbyemail/base';
import { ITemplateSize } from '@gamesbyemail/base';
import { TemplateLibraryService } from '@gamesbyemail/base';

export interface IPieceKey {
  type: 'Pawn' | 'Knight' | 'Bishop' | 'Rook' | 'Queen' | 'King';
  team: 'White' | 'Black';
  small?: boolean;
  resigned?: boolean;
}
@Component({
  selector: 'gamesbyemail-games-chess-default-piecelibrary',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent implements ITemplateLibrary {
  @ViewChildren(TemplateRef) templateRefs!: QueryList<TemplateRef<any>>;

  constructor(private templateLibraryService: TemplateLibraryService) {
  }

  getTemplate(key: IPieceKey): TemplateRef<any> | undefined {
    return this.templateLibraryService.findTemplateById(this.templateRefs, key.type + key.team + (key.type === 'King' && key.resigned ? 'Resigned' : '') + (key.small ? 'Small' : ''));
  }
  getSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined {
    return this.templateLibraryService.getTemplateSize(template);
  }

}
