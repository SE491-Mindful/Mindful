/* eslint-disable no-undef */
import { Component } from '@angular/core';

@Component({
  selector: 'app-focus-main',
  templateUrl: './focus-main.component.html',
  styleUrls: ['./focus-main.component.css']
})
export class FocusMainComponent {
  focusHours: number = 0;
  focusMinutes: number = 0;
  focusSeconds: number = 0;
  focusStarted = false;
  countdown: NodeJS.Timeout | undefined;
  focusAnimationElement: Element | null = null;

  startFocus = () => {
    this.calculateFocusValues();
    this.focusStarted = true;

    this.countdown = setInterval(() => {
      console.log('hours:' + this.focusHours);

      // if minutes hits 0, decrement hours
      if (this.focusMinutes === 0 && this.focusHours > 0) {
        this.focusHours -= 1;
        this.focusMinutes = 59;
      }

      // if seconds hits 0, decrement minutes
      if (this.focusSeconds === 0 && this.focusMinutes > 0) {
        this.focusMinutes -= 1;
        this.focusSeconds = 59;
      }

      if (this.focusAnimationElement == null) {
        this.focusAnimationElement = document.getElementsByClassName('circle-button center-page-button btn btn-danger')[0];
        this.focusAnimationElement?.setAttribute('class', 'circle-button center-page-button btn btn-danger center-page-button-animation');
      }

      if (this.focusFinished()) this.endFocus();

      this.focusSeconds -= 1;
    }, 1000);

    console.log('Focus Started!');
  };

  // user input is minutes, and calculate the number of hours and minutes to focus.
  calculateFocusValues = (): void => {
    const rawHours = this.focusMinutes / 60;
    if (rawHours > 1) {
      const intHours = Math.floor(rawHours);

      // inital values;
      this.focusHours = intHours;
      this.focusMinutes = Math.round(Math.abs((rawHours - intHours) * 60));
    }
  };

  // calculateSeconds = (): number => this.focusMinutes * 60;
  focusFinished = (): boolean => this.focusHours === 0 && this.focusMinutes === 0 && this.focusSeconds === 0;

  endFocus = (): void => {
    clearInterval((<NodeJS.Timeout> this.countdown));
    this.focusHours = 0;
    this.focusMinutes = 0;
    this.focusSeconds = 0;
    this.focusStarted = false;
  };
}
