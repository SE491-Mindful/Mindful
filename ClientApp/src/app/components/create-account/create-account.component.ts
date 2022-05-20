import { Component } from '@angular/core';
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
  constructor (private fireStore: FirebaseService) { }

  createAccount () {
    // this.fireStore.createUser(this.model);
    this.fireStore.createUserFirebase(this.model.username, this.model.password);
    console.log('created clicked!');
  };
}
