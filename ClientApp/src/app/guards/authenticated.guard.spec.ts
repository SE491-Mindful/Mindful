/* eslint-disable no-undef */
import { AppSessionStorageKey } from '../constants/app.constants';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticatedGuard } from './authenticated.guard';
import { RouterService } from '../services/router.service';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let router: RouterService;

  beforeEach(() => {
    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
    router = jasmine.createSpyObj('RouterService', ['navigate']);

    guard = new AuthenticatedGuard(router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true', async () => {
      sessionStorage.setItem(AppSessionStorageKey.userName, 'unitTestUser');
      expect(guard.canActivate(route, state)).toBeTrue();
    });
    it('should return false', async () => {
      sessionStorage.clear();
      expect(guard.canActivate(route, state)).toBeFalse();
    });
  });
});
