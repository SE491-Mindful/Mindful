import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes, AppSessionStorageKey } from '../constants/app.constants';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  // eslint-disable-next-line no-useless-constructor
  constructor (private routerService: RouterService) {}

  canActivate
  (

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // eslint-disable-next-line no-undef
    const isAuthenticated = sessionStorage.getItem(AppSessionStorageKey.userName) != null;
    if (isAuthenticated) {
      return true;
    } else {
      this.routerService.navigate(AppRoutes.Login);
      return false;
    }
  }
}
