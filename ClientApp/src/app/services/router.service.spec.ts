/* eslint-disable no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, first, pipe, ReplaySubject } from 'rxjs';
import { asSpy } from 'src/test';
import { AppRoutes } from '../constants/app.constants';

import { RouterService } from './router.service';

describe('RouterService', () => {
  let fixture: ComponentFixture<RouterService>;
  let service: RouterService;
  let router: any;
  const eventSubject = new ReplaySubject<RouterEvent>(1);

  beforeEach(() => {
    router = {
      navigate: jasmine.createSpy('navigate'),
      events: eventSubject.asObservable(),
      url: 'unitTest/home'
    };

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(RouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Figure this out.
  // describe('test route subscriptions', () => {
  //   it('should be loginRoute', async () => {
  //     eventSubject.next(new NavigationEnd(1, AppRoutes.Login, AppRoutes.Login));

  //     service.isLoginRoute$.next = jasmine.createSpy('next');
  //     service.isFocusRoute$.next = jasmine.createSpy('next');
  //     service.isPreferencesRoute$.next = jasmine.createSpy('next');

  //     expect(service.isLoginRoute$.next).toHaveBeenCalledTimes(1);
  //     expect(service.isFocusRoute$.next).toHaveBeenCalledTimes(1);
  //     expect(service.isPreferencesRoute$.next).toHaveBeenCalledTimes(1);
  //   });
  // });

  describe('navigateFromLogin', () => {
    it('should navigate from the login to calendar component', async () => {
      service.navigateFromLogin();

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([AppRoutes.Calendar]);
    });
  });
  describe('navigate', () => {
    it('should navigate to somewhere', async () => {
      service.navigate('unitTest');
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['unitTest']);
    });
  });
});
