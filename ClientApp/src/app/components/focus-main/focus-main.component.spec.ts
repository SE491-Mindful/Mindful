import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusMainComponent } from './focus-main.component';

describe('FocusMainComponent', () => {
  let component: FocusMainComponent;
  let fixture: ComponentFixture<FocusMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
