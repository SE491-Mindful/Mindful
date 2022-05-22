import { RouterService } from 'src/app/services/router.service';

import { PreferencesButtonComponent } from './preferences-button.component';

describe('PreferencesButtonComponent', () => {
  let component: PreferencesButtonComponent;
  const routerService = {} as RouterService;

  beforeEach(async () => {
    component = new PreferencesButtonComponent(routerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
