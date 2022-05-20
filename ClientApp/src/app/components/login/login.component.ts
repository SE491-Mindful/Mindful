/* eslint-disable no-useless-constructor */
import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/constants/app.constants';
import { LoginModel } from 'src/app/models/loginInput.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private routerService: RouterService, private firestore: FirebaseService) {
  }

  model = {} as LoginModel;

  login = (): void => {
    this.firestore.loginEmailFirebase(this.model.username, this.model.password);
  };

  createAccount = (): void => {
    this.routerService.navigate(AppRoutes.CreateAccount);
  };
}
