import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/constants/app.constants';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private routerService: RouterService,
    private fireBaseService: FirebaseService,
    public auth: AngularFireAuth) {
  }

  onClick = () => {
    this.fireBaseService.logoutFirebaseUser();
    // eslint-disable-next-line no-undef
    this.routerService.navigate(AppRoutes.Login);
  };

  logout () {
    this.auth.signOut();
    this.routerService.navigate(AppRoutes.Login);
  }
}
