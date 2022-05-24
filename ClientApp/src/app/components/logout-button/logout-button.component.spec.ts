
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';
import { LogoutButtonComponent } from './logout-button.component';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;

  beforeEach(() => {
    component = new LogoutButtonComponent({} as RouterService, {} as FirebaseService, {} as AngularFireAuth);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
