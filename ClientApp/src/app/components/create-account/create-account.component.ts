import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/models/firebase/i-user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  model = {} as IUser;

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private toastrService: ToastrService,
    private fireStore: FirebaseService) { }

  async createAccount () {
    // this.fireStore.createUser(this.model);
    const result = await this.fireStore.createUserFirebase(this.model.username, this.model.password);

    if (!result.success) {
      this.toastrService.error(result.error.errorMessage);
    } else {
      this.toastrService.success('Account Created Successfully');
    }
    console.log('created clicked!');
  };
}
