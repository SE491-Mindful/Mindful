
import { RouterService } from 'src/app/services/router.service';
import { LogoutButtonComponent } from './logout-button.component';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;

  beforeEach(() => {
    component = new LogoutButtonComponent({} as RouterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
