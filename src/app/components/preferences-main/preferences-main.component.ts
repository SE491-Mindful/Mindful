import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PreferencesFormModel } from 'src/app/models/preferencesForm.model';
import { RouterService } from 'src/app/services/router.service';

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
    private toastrService: ToastrService) {
  }

  cancel = () => {
    this.routerService.navigate('login');
  };

  save = () => {
    // TODO: actually save this somewhere.
    this.toastrService.success('Preferences Saved.');
    console.log(JSON.stringify(this.model));
  };
}
