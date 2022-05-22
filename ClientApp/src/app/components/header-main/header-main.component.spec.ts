import { RouterService } from 'src/app/services/router.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { HeaderMainComponent } from './header-main.component';

describe('HeaderMainComponent', () => {
  let component: HeaderMainComponent;

  beforeEach(() => {
    component = new HeaderMainComponent({} as SessionStorageService, {} as RouterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
