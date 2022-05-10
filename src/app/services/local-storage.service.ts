/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { AppDefaultStorageObj, AppLocalStorageKey } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor () {
    // Attempts to find the App Local Storage, otherwise creates a new one.
    if (localStorage.getItem(AppLocalStorageKey) == null) {
      localStorage.setItem(AppLocalStorageKey, JSON.stringify(AppDefaultStorageObj));
    }
  }
}
