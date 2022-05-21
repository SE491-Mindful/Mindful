
import { ToastrService } from 'ngx-toastr';
import { RouterService } from 'src/app/services/router.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

import { PreferencesMainComponent } from './preferences-main.component';

describe('PreferencesMainComponent', () => {
  let component: PreferencesMainComponent;
  const routerServce = {} as RouterService;
  const toastrService = {} as ToastrService;
  beforeEach(async () => {
    component = new PreferencesMainComponent(routerServce, toastrService, new SessionStorageService());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
