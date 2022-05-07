
import { RouterService } from 'src/app/services/router.service';

import { PreferencesMainComponent } from './preferences-main.component';

describe('PreferencesMainComponent', () => {
  let component: PreferencesMainComponent;
  const routerServce = {} as RouterService;
  beforeEach(async () => {
    component = new PreferencesMainComponent(routerServce);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
