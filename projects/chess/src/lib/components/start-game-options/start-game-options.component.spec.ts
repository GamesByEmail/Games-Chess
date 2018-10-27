import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameOptionsComponent } from './start-game-options.component';

describe('StartGameOptionsComponent', () => {
  let component: StartGameOptionsComponent;
  let fixture: ComponentFixture<StartGameOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartGameOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
