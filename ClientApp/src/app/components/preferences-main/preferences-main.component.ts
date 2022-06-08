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
