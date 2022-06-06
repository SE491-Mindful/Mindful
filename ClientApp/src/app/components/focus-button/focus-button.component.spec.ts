import { AppRoutes } from 'src/app/constants/app.constants';
import { RouterService } from 'src/app/services/router.service';
import { FocusButtonComponent } from './focus-button.component';

describe('FocusButtonComponent', () => {
  let component: FocusButtonComponent;
  let routerService: RouterService;

  beforeEach(() => {
    routerService = jasmine.createSpyObj('RouterService', ['navigate']);
    component = new FocusButtonComponent(routerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick', () => {
    it('should router navigate to focus-main component', async () => {
      component.onClick();

      expect(routerService.navigate).toHaveBeenCalledTimes(1);
      expect(routerService.navigate).toHaveBeenCalledWith(AppRoutes.Focus);
    });
  });
});
