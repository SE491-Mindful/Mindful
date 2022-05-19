import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/constants/app.constants';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-focus-button',
  templateUrl: './focus-button.component.html',
  styleUrls: ['./focus-button.component.css']
})
export class FocusButtonComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor (private routerService: RouterService) { }
  onClick = ():void => {
    this.routerService.navigate(AppRoutes.Focus);
  };
}
