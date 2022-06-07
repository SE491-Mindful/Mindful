import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AppRoutes } from 'src/app/constants/app.constants';
import { IPreferencesFormModel } from 'src/app/models/i-preferencesForm.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-preferences-main',
  templateUrl: './preferences-main.component.html',
  styleUrls: ['./preferences-main.component.css']
})
export class PreferencesMainComponent implements OnDestroy {
  // model used by the preferences form injected as an input in the template.
  // private readonly defaultModel = {
  //   color1: '#ff0000',
  //   color2: '#d0972f',
  //   color3: '#bfd235',
  //   color4: '#d4ff55',
  //   color5: '#99f763',
  //   color6: '#00ff94'
  // } as IPreferencesFormModel;

  model = {} as IPreferencesFormModel;

  destroyed$ = new Subject<boolean>();

  constructor (
    private routerService: RouterService,
    private toastrService: ToastrService,
    private firebaseService: FirebaseService) {
    this.firebaseService.getUserPreferences().subscribe(data => {
      this.model = data[0] ?? {};
    }, takeUntil(this.destroyed$));
  }

  ngOnDestroy (): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  cancel = () => {
    this.routerService.navigate(AppRoutes.Calendar);
  };

  save = async () => {
    await this.firebaseService.saveUserPreferences(this.model);
  };
}
