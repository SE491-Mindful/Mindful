import { Component, Input } from '@angular/core';
import { PreferencesFormModel } from 'src/app/models/preferencesForm.model';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.css']
})
export class PreferencesFormComponent {
  @Input()
    model = {} as PreferencesFormModel;

  enablePushNotifications = () => {
    // TODO: learn more about push notifications --> https://angular.io/guide/service-worker-notifications
  };
}
