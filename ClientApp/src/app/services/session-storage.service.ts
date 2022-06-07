/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSessionStorageKey } from '../constants/app.constants';
import { IPreferencesFormModel } from '../models/i-preferencesForm.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  // eslint-disable-next-line no-useless-constructor
  public readonly isUserAuthenticated$ = new Subject<boolean>();

  // eslint-disable-next-line no-useless-constructor
  constructor () {
    this.clear();
  }

  setAuthenticatedUser = (user: string = ''): void => {
    if (user.length === 0) {
      this.isUserAuthenticated$.next(false);
      sessionStorage.removeItem(AppSessionStorageKey.userName);
    } else {
      this.isUserAuthenticated$.next(true);
      sessionStorage.setItem(AppSessionStorageKey.userName, user);
    }
  };

  getAuthenticatedUser = (): string => {
    return sessionStorage.getItem(AppSessionStorageKey.userName) ?? '';
  };

  setPreferences = (model: IPreferencesFormModel) => {
    sessionStorage.setItem(AppSessionStorageKey.preferences.toString(), JSON.stringify(model));
  };

  getPreferences = (): IPreferencesFormModel => {
    const preferences = sessionStorage.getItem(AppSessionStorageKey.preferences.toString()) ?? '';
    return (preferences.length > 0) ? JSON.parse(preferences) as IPreferencesFormModel : {} as IPreferencesFormModel;
  };

  clear = (): void => {
    this.isUserAuthenticated$.next(false);
    sessionStorage.clear();
  };
}
