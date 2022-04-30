/* eslint-disable no-useless-constructor */
import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/constants/app.constants';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-preferences-button',
  templateUrl: './preferences-button.component.html',
  styleUrls: ['./preferences-button.component.css']
})
export class PreferencesButtonComponent {
  constructor (private routerService: RouterService) {
  }

  onClick = () => {
    this.routerService.navigate(AppRoutes.Preferences);
  };
}
