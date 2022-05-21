
import { FirebaseService } from 'src/app/services/firebase.service';
import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;

  beforeEach(() => {
    component = new CreateAccountComponent({} as FirebaseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
