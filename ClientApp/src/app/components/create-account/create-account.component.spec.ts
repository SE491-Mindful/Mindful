
import { ToastrService } from 'ngx-toastr';
import { ICreateUserResultModel } from 'src/app/models/i-createUser-result.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { asSpy } from 'src/test';
import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let toaster: ToastrService;
  let fireService: FirebaseService;

  beforeEach(() => {
    toaster = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    fireService = jasmine.createSpyObj('FirebaseService', ['createUserFirebase']);
    component = new CreateAccountComponent(toaster, fireService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createAccount', () => {
    it('should create successfully', async () => {
      const returnResult = {
        success: true,
        error: { errorMessage: '' }
      } as ICreateUserResultModel;

      component.model.password = 'unitTestPassword';
      component.confirmPassword = 'unitTestPassword';
      asSpy(fireService.createUserFirebase).and.returnValue(returnResult);
      asSpy(toaster.success).and.returnValue(null);
      await component.createAccount();

      expect(fireService.createUserFirebase).toHaveBeenCalledTimes(1);
      expect(toaster.error).toHaveBeenCalledTimes(0);
      expect(toaster.success).toHaveBeenCalledTimes(1);
    });

    it('should fail to create', async () => {
      const returnResult = {
        success: false,
        error: { errorMessage: 'unit test error' }
      } as ICreateUserResultModel;

      component.model.password = 'unitTestPassword';
      component.confirmPassword = 'unitTestPassword';
      asSpy(fireService.createUserFirebase).and.returnValue(returnResult);
      asSpy(toaster.error).and.returnValue(null);
      await component.createAccount();

      expect(fireService.createUserFirebase).toHaveBeenCalledTimes(1);
      expect(toaster.error).toHaveBeenCalledWith(returnResult.error.errorMessage);
      expect(toaster.error).toHaveBeenCalledTimes(1);
      expect(toaster.success).toHaveBeenCalledTimes(0);
    });

    it('should indicate password does not match', async () => {
      component.model.password = 'unitTestPassword';
      component.confirmPassword = 'differentPassword';

      await component.createAccount();

      expect(toaster.error).toHaveBeenCalledWith('Confirm Password must match.');
      expect(toaster.error).toHaveBeenCalledTimes(1);
      expect(fireService.createUserFirebase).toHaveBeenCalledTimes(0);
      expect(toaster.success).toHaveBeenCalledTimes(0);
    });
  });
});
