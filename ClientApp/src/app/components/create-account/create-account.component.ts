import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/models/firebase/i-user';
import { IPreferencesFormModel } from 'src/app/models/i-preferencesForm.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  // model used by the preferences form injected as an input in the template.
  private readonly defaultPreferences = {
    trackingDescription: 'Daily Mindfulness Minutes',
    dailyMinuteGoal: 30,
    color1: '#ff0000',
    color2: '#d0972f',
    color3: '#bfd235',
    color4: '#d4ff55',
    color5: '#99f763',
    color6: '#00ff94'
  } as IPreferencesFormModel;

  model = {} as IUser;
  confirmPassword = '';

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private toastrService: ToastrService,
    private fireStore: FirebaseService) { }

  async createAccount () {
    if (this.confirmPassword !== this.model.password) {
      this.toastrService.error('Confirm Password must match.');
    } else {
      const result = await this.fireStore.createUserFirebase(this.model.username, this.model.password);

      if (!result.success) {
        this.toastrService.error(result.error.errorMessage);
      } else {
        this.toastrService.success('Account Created Successfully');
        this.fireStore.saveUserPreferences(this.defaultPreferences);
      }
    }
  };
}
