/* eslint-disable no-undef */
import { FocusMainComponent } from './focus-main.component';

describe('FocusMainComponent', () => {
  let component: FocusMainComponent;

  beforeEach(() => {
    component = new FocusMainComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy', () => {
    it('should wipe out the focus session', async () => {
      component.startFocus();

      expect(component.focusSounds).toBeTruthy();
      expect(component.countdown).toBeTruthy();

      component.ngOnDestroy();

      expect(component.focusSounds?.playing()).toBeFalsy();
      expect(component.countdown).toBeFalsy();
    });
  });

  // describe('startFocus', () => {
  //   // TODO: implement me.
  // });

  describe('calculateFocusValues', () => {
    it('should calculate for 15 minutes', async () => {
      component.calculateFocusValues();

      expect(component.focusHours).toBe(0);
      expect(component.focusMinutes).toBe(15);
      expect(component.focusSeconds).toBe(0);
    });
    it('should calculate for 61 minutes', async () => {
      component.focusMinutes = 61;
      component.calculateFocusValues();

      expect(component.focusHours).toBe(1);
      expect(component.focusMinutes).toBe(1);
      expect(component.focusSeconds).toBe(0);
    });
  });

  describe('focusFinished', () => {
    it('should not be finished', async () => {
      component.focusHours = 0;
      component.focusMinutes = 0;
      component.focusSeconds = 1;

      expect(component.focusFinished()).toBeFalsy();
    });
    it('should be finished', async () => {
      component.focusHours = 0;
      component.focusMinutes = 0;
      component.focusSeconds = 0;

      expect(component.focusFinished()).toBeTruthy();
    });
  });

  describe('endFocus', () => {
    it('should end the focus countdown', async () => {
      component.focusMinutes = 90;
      component.startFocus();

      component.endFocus();

      expect(component.focusHours).toBe(0);
      expect(component.focusMinutes).toBe(0);
      expect(component.focusSeconds).toBe(0);
      expect(component.focusStarted).toBeFalsy();
      expect(component.focusSounds?.playing()).toBeFalsy();
    });
  });

  describe('playFocusSounds', () => {
    it('should create and play a howl', async () => {
      expect(component.focusSounds).toBeFalsy();
      component.playFocusSounds();
      expect(component.focusSounds).toBeTruthy();
    });
  });
});
