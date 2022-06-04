
import { AppRoutes } from 'src/app/constants/app.constants';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';
import { LogoutButtonComponent } from './logout-button.component';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let routerService: RouterService;
  let firebaseService: FirebaseService;

  beforeEach(() => {
    routerService = jasmine.createSpyObj('RouterSerivce', ['navigate']);
    firebaseService = jasmine.createSpyObj('FirebaseService', ['logoutFirebaseUser']);
    component = new LogoutButtonComponent(routerService, firebaseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick', () => {
    it('should logout the user and navigate to login.', async () => {
      component.onClick();
      expect(firebaseService.logoutFirebaseUser).toHaveBeenCalledTimes(1);
      expect(routerService.navigate).toHaveBeenCalledTimes(1);
      expect(routerService.navigate).toHaveBeenCalledWith(AppRoutes.Login);
    });
  });
});
