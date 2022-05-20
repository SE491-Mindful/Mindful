import { RouterService } from 'src/app/services/router.service';
import { FocusButtonComponent } from './focus-button.component';

describe('FocusButtonComponent', () => {
  let component: FocusButtonComponent;

  beforeEach(() => {
    component = new FocusButtonComponent({} as RouterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
