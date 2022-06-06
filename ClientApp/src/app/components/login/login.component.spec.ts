/* eslint-disable no-undef */
import { AppRoutes } from 'src/app/constants/app.constants';
import { ILoginUserResultModel } from 'src/app/models/i-loginUser-result.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';
import { ToastrService } from 'ngx-toastr';

import { asSpy } from 'src/test';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let routerService: RouterService;
  let toastrService: ToastrService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    routerService = jasmine.createSpyObj('RouterService', ['navigate']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    firebaseService = jasmine.createSpyObj('FirebaseService', ['loginEmailFirebase', 'loginGoogleFirebase']);
    component = new LoginComponent(toastrService, routerService, firebaseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('should successfully login', async () => {
      const returnResult = {
        success: true,
        error: { errorMessage: '' }
      } as ILoginUserResultModel;
      asSpy(firebaseService.loginEmailFirebase).and.returnValue(returnResult);

      await component.login();

      expect(firebaseService.loginEmailFirebase).toHaveBeenCalledTimes(1);
      expect(toastrService.success).toHaveBeenCalledTimes(1);
      expect(toastrService.success).toHaveBeenCalledWith('Email Login Successful.');
    });
    it('should fail to login', async () => {
      const returnResult = {
        success: false,
        error: { errorMessage: 'unit test error' }
      } as ILoginUserResultModel;
      asSpy(firebaseService.loginEmailFirebase).and.returnValue(returnResult);

      await component.login();

      expect(firebaseService.loginEmailFirebase).toHaveBeenCalledTimes(1);
      expect(toastrService.error).toHaveBeenCalledTimes(1);
      expect(toastrService.error).toHaveBeenCalledWith(returnResult.error.errorMessage);
    });
  });

  describe('loginGoogle', () => {
    it('should successfully login', async () => {
      const returnResult = {
        success: true,
        error: { errorMessage: '' }
      } as ILoginUserResultModel;
      asSpy(firebaseService.loginGoogleFirebase).and.returnValue(returnResult);

      await component.loginGoogle();

      expect(firebaseService.loginGoogleFirebase).toHaveBeenCalledTimes(1);
      expect(toastrService.success).toHaveBeenCalledTimes(1);
      expect(toastrService.success).toHaveBeenCalledWith('Google Login Successful.');
    });
    it('should fail to login', async () => {
      const returnResult = {
        success: false,
        error: { errorMessage: 'unit test error' }
      } as ILoginUserResultModel;
      asSpy(firebaseService.loginGoogleFirebase).and.returnValue(returnResult);

      await component.loginGoogle();

      expect(firebaseService.loginGoogleFirebase).toHaveBeenCalledTimes(1);
      expect(toastrService.error).toHaveBeenCalledTimes(1);
      expect(toastrService.error).toHaveBeenCalledWith(returnResult.error.errorMessage);
    });
  });

  describe('createAccount', () => {
    it('should navigate to app-create-account component', async () => {
      component.createAccount();

      expect(routerService.navigate).toHaveBeenCalledTimes(1);
      expect(routerService.navigate).toHaveBeenCalledWith(AppRoutes.CreateAccount);
    });
  });
});
