import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  const routerService = {} as RouterService;

  beforeEach(async () => {
    component = new LoginComponent({} as ToastrService, routerService, {} as FirebaseService, {} as AngularFireAuth, {} as AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
