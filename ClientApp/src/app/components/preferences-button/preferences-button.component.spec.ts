import { AppRoutes } from 'src/app/constants/app.constants';
import { RouterService } from 'src/app/services/router.service';

import { PreferencesButtonComponent } from './preferences-button.component';

describe('PreferencesButtonComponent', () => {
  let component: PreferencesButtonComponent;
  let routerService: RouterService;

  beforeEach(async () => {
    routerService = jasmine.createSpyObj('RouterService', ['navigate']);
    component = new PreferencesButtonComponent(routerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick', () => {
    it('should navigate to preferences', async () => {
      component.onClick();

      expect(routerService.navigate).toHaveBeenCalledTimes(1);
      expect(routerService.navigate).toHaveBeenCalledWith(AppRoutes.Preferences);
    });
  });
});
