import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppRoutes } from 'src/app/constants/app.constants';
import { PreferencesFormModel } from 'src/app/models/preferencesForm.model';
import { RouterService } from 'src/app/services/router.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-preferences-main',
  templateUrl: './preferences-main.component.html',
  styleUrls: ['./preferences-main.component.css']
})
export class PreferencesMainComponent {
  // model used by the preferences form injected as an input in the template.
  model = {} as PreferencesFormModel;

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private routerService: RouterService,
    private toastrService: ToastrService,
    private sessionStorageService: SessionStorageService) {
  }

  save = () => {
    this.toastrService.success('Preferences Saved.');
    this.sessionStorageService.setPreferences(this.model);
    this.routerService.navigate(AppRoutes.Calendar);
    console.log(JSON.stringify(this.model));
  };
}
