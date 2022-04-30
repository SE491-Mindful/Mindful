import { Router } from '@angular/router';
import { RouterService } from 'src/app/services/router.service';

import { PreferencesButtonComponent } from './preferences-button.component';

describe('PreferencesComponent', () => {
  let component: PreferencesButtonComponent;
  const router = <Router>{};
  const routerService = new RouterService(router);

  beforeEach(async () => {
    component = new PreferencesButtonComponent(routerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
