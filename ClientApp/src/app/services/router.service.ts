/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor (private router: Router) {
  }

  // function that handles the navigation on a successful authentication into Mindful
  navigateFromLogin = () => {
    this.router.navigate(['calendar']);
  };
}
