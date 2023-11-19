import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishgamesComponent } from './wishgames.component';

describe('WishgamesComponent', () => {
  let component: WishgamesComponent;
  let fixture: ComponentFixture<WishgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishgamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
