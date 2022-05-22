import { Component, Input } from '@angular/core';
import { PreferencesFormModel } from 'src/app/models/preferencesForm.model';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.css']
})
export class PreferencesFormComponent {
  @Input()
    model = {} as PreferencesFormModel;

  // eslint-disable-next-line no-useless-constructor
  constructor (private sessionStorageService: SessionStorageService) {
    // Attempts to retrieve app preferences from session storage.
    this.getPreferences();
  }

  enablePushNotifications = () => {
    // TODO: learn more about push notifications --> https://angular.io/guide/service-worker-notifications
  };

  getPreferences = () => {
    this.model = this.sessionStorageService.getPreferences();
  };
}
