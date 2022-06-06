import { AppSessionStorageKey } from '../constants/app.constants';
import { PreferencesFormModel } from '../models/preferencesForm.model';

import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;
  beforeEach(() => {
    service = new SessionStorageService();
    spyOn(window.sessionStorage, 'setItem').and.callFake((key: any, value: any) => {});
    spyOn(window.sessionStorage, 'getItem').and.callFake((key:string) => null);
    spyOn(window.sessionStorage, 'clear').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setAuthenticatedUser', () => {
    it('should set user on session storage', async () => {
      service.setAuthenticatedUser('FN-2187');
      expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(AppSessionStorageKey.userName, 'FN-2187');
    });
  });
  describe('getAuthenticatedUser', () => {
    it('should get user from session storage', async () => {
      service.getAuthenticatedUser();
      expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.getItem).toHaveBeenCalledWith(AppSessionStorageKey.userName);
    });
  });
  describe('setPreferences', () => {
    it('should set preferences on session storage', async () => {
      const model = {} as PreferencesFormModel;
      service.setPreferences(model);
      expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(AppSessionStorageKey.preferences, JSON.stringify(model));
    });
  });
  describe('getPreferences', () => {
    it('should get user from session storage', async () => {
      service.getPreferences();
      expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.getItem).toHaveBeenCalledWith(AppSessionStorageKey.preferences);
    });
  });

  describe('clear', () => {
    it('should clear session storage', async () => {
      service.clear();
      expect(window.sessionStorage.clear).toHaveBeenCalledTimes(1);
    });
  });
});
