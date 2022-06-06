import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/constants/app.constants';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private routerService: RouterService,
    private fireBaseService: FirebaseService) {
  }

  onClick = () => {
    this.fireBaseService.logoutFirebaseUser();
    this.routerService.navigate(AppRoutes.Login);
  };
}
