/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

// Import the functions you need from the SDKs you need
import { initializeApp } from '@firebase/app';
import { getAnalytics } from '@firebase/analytics';
import { FirebaseConfig } from './constants/app.constants';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { RouterService } from './services/router.service';
import { Observable } from 'rxjs';

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const analytics = getAnalytics(app);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isFocusRoute$: Observable<boolean>;
  isLoginRoute$: Observable<boolean>;

  constructor (private routerService: RouterService,
    private storage: LocalStorageService) {
    this.isFocusRoute$ = this.routerService.isFocusRoute$;
    this.isLoginRoute$ = this.routerService.isLoginRoute$;
  }
}
