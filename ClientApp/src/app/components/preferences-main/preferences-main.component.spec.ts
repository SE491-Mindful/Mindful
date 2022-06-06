
import { ToastrService } from 'ngx-toastr';
import { AppRoutes } from 'src/app/constants/app.constants';
import { RouterService } from 'src/app/services/router.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

import { PreferencesMainComponent } from './preferences-main.component';

describe('PreferencesMainComponent', () => {
  let component: PreferencesMainComponent;
  let routerServce: RouterService;
  let toastrService: ToastrService;
  beforeEach(async () => {
    routerServce = jasmine.createSpyObj('RouterService', ['navigate']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    component = new PreferencesMainComponent(routerServce, toastrService, new SessionStorageService());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('should save preferences to session storage', async () => {
      component.save();

      expect(toastrService.success).toHaveBeenCalledTimes(1);
      expect(routerServce.navigate).toHaveBeenCalledTimes(1);
      expect(routerServce.navigate).toHaveBeenCalledWith(AppRoutes.Calendar);
    });
  });
});
