/* eslint-disable no-useless-constructor */
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppRoutes } from 'src/app/constants/app.constants';
import { ILoginModel } from 'src/app/models/i-login.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (
    private toastrService: ToastrService,
    private routerService: RouterService,
    private firestore: FirebaseService) {
  }

  model = {} as ILoginModel;

  login = async (): Promise<void> => {
    const result = await this.firestore.loginEmailFirebase(this.model.username, this.model.password);

    if (!result.success) {
      this.toastrService.error(result.error.errorMessage);
    } else {
      this.toastrService.success('Email Login Successful.');
    }
  };

  loginGoogle = async (): Promise<void> => {
    const result = await this.firestore.loginGoogleFirebase();

    if (!result.success) {
      this.toastrService.error(result.error.errorMessage);
    } else {
      this.toastrService.success('Google Login Successful.');
    }
  };

  createAccount = (): void => {
    this.routerService.navigate(AppRoutes.CreateAccount);
  };
}
