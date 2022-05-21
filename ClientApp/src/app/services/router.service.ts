/* eslint-disable no-import-assign */
/* eslint-disable no-undef */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';
import { AppRoutes } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  public readonly isLoginRoute$ = new Subject<boolean>();
  public readonly isFocusRoute$ = new Subject<boolean>();
  public readonly isPreferencesRoute$ = new Subject<boolean>();

  constructor (private router: Router) {
    this.createRouteSubscriptions();
  }

  // function that handles the navigation on a successful authentication into Mindful.
  navigateFromLogin = () => {
    this.router.navigate(['calendar']);
  };

  // wrapper to simplify navigate functionality on router.
  navigate = (location: string) => {
    this.router.navigate([location]);
  };

  // creates a subscription that will notifiy when the route is the login route.
  private createRouteSubscriptions = (): void => {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        this.isLoginRoute$.next(event.url.includes(AppRoutes.Login));
        this.isFocusRoute$.next(event.url.includes(AppRoutes.Focus));
        this.isPreferencesRoute$.next(event.url.includes(AppRoutes.Preferences));
      });
  };
}
