import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavegameComponent } from './savegame.component';

describe('SavegameComponent', () => {
  let component: SavegameComponent;
  let fixture: ComponentFixture<SavegameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavegameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
