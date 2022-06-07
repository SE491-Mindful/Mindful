
import { RouterService } from 'src/app/services/router.service';
import { CalendarButtonComponent } from './calendar-button.component';

describe('CalendarButtonComponent', () => {
  let component: CalendarButtonComponent;
  let routerSerivce: RouterService;

  beforeEach(async () => {
    routerSerivce = jasmine.createSpyObj('RouterService', ['navigate']);
  });

  beforeEach(() => {
    component = new CalendarButtonComponent(routerSerivce);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
