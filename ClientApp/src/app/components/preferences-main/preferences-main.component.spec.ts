
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';
import { asSpy } from 'src/test';

import { PreferencesMainComponent } from './preferences-main.component';

describe('PreferencesMainComponent', () => {
  let component: PreferencesMainComponent;
  let routerServce: RouterService;
  let toastrService: ToastrService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    routerServce = jasmine.createSpyObj('RouterService', ['navigate']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    firebaseService = jasmine.createSpyObj('FirebaseService', ['getUserPreferences', 'saveUserPreferences', 'subscribe']);
    asSpy(firebaseService.getUserPreferences).and.returnValue(of());
    asSpy(firebaseService.saveUserPreferences).and.returnValue(new Promise<void>(() => {}));

    component = new PreferencesMainComponent(routerServce, toastrService, firebaseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('should save preferences to firebase', async () => {
      component.save();

      expect(firebaseService.saveUserPreferences).toHaveBeenCalledTimes(1);
    });
  });
});
