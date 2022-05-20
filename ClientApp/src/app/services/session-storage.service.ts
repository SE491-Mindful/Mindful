/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSessionStorageKey } from '../constants/app.constants';
import { PreferencesFormModel } from '../models/preferencesForm.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  public readonly authenticatedUser$ = new BehaviorSubject<string>('');

  // eslint-disable-next-line no-useless-constructor
  constructor () { }

  setAuthenticatedUser = (user: string): void => {
    this.authenticatedUser$.next(user);
    sessionStorage.setItem(AppSessionStorageKey.userName, user);
  };

  getAuthenticatedUser = (): string => {
    return sessionStorage.getItem(AppSessionStorageKey.userName) ?? '';
  };

  setPreferences = (model: PreferencesFormModel) => {
    sessionStorage.setItem(AppSessionStorageKey.preferences.toString(), JSON.stringify(model));
  };

  getPreferences = (): PreferencesFormModel => {
    const preferences = sessionStorage.getItem(AppSessionStorageKey.preferences.toString()) ?? '';
    return (preferences.length > 0) ? JSON.parse(preferences) as PreferencesFormModel : {} as PreferencesFormModel;
  };
}
