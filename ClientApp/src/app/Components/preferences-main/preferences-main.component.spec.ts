import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesMainComponent } from './preferences-main.component';

describe('PreferencesMainComponent', () => {
  let component: PreferencesMainComponent;
  let fixture: ComponentFixture<PreferencesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferencesMainComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
