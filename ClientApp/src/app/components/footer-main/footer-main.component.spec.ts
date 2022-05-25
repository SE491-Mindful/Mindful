
import { RouterService } from 'src/app/services/router.service';
import { FooterMainComponent } from './footer-main.component';

describe('FooterMainComponent', () => {
  let component: FooterMainComponent;

  beforeEach(() => {
    component = new FooterMainComponent({} as RouterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
