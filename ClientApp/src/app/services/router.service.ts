/* eslint-disable no-import-assign */
/* eslint-disable no-undef */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor (private router: Router) {
  }

  // function that handles the navigation on a successful authentication into Mindful.
  navigateFromLogin = () => {
    this.router.navigate(['calendar']);
  };

  // wrapper to simplify navigate functionality on router.
  navigate = (location: string) => {
    this.router.navigate([location]);
  };

  checkAuthentication = () => {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart)
      )
      .subscribe(() => {
      });
  };
}
