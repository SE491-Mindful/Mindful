
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;

  beforeEach(() => {
    component = new CreateAccountComponent({} as ToastrService, {} as FirebaseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
