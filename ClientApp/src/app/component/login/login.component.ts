/* eslint-disable no-useless-constructor */
import { Component } from '@angular/core';
import { LoginModel } from 'src/app/models/loginInput.model';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private routerService: RouterService) {
  }

  model = {} as LoginModel;

  login = (): void => {
    this.routerService.navigateFromLogin();
  };
}
