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

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const analytics = getAnalytics(app);

export let AUTHENTICATED_USER = '';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private storage: LocalStorageService) {
  }
}
