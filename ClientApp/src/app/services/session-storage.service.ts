/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { AppSessionStorageKey } from '../constants/app.constants';
import { PreferencesFormModel } from '../models/preferencesForm.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }

  setSocialUser = (user: string): void => {
    sessionStorage.setItem(AppSessionStorageKey.userName, user);
  };

  getSocialUser = (): string => {
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
