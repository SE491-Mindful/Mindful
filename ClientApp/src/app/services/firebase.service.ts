/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseCollectionKeys } from '../constants/app.constants';
import { IUser } from '../models/firebase/i-user';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signOut } from '@firebase/auth';
import { SessionStorageService } from './session-storage.service';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // eslint-disable-next-line no-useless-constructor
  auth: any;
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private store: AngularFirestore,
    private sessionStorage: SessionStorageService,
    private routerService: RouterService) {
    this.auth = getAuth();

    this.auth.onAuthStateChanged((user: { email: string; }) => {
      if (user) {
        this.sessionStorage.setAuthenticatedUser(user.email);
        this.routerService.navigateFromLogin();
      } else {
        this.sessionStorage.authenticatedUser$.next('');
      }
    });
  };

  createUser (user: IUser) {
    user.id = this.store.createId();
    user.createdDate = new Date();
    user.modifiedDate = new Date();

    this.store.firestore.collection(FirebaseCollectionKeys.users)
      .add(user)
      .catch((e) => {
        throw new Error('Error attempting to add user to database.');
      }).then(() => {
        console.log('Added user successfully to database.');
      });
  }

  createUserFirebase = (email: string, password: string) => {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
      })
      .catch((error) => {
        throw new Error('Status Code: ' + error.code + 'Error Message: ' + error.message);
      });
  };

  loginEmailFirebase = (email: string, password: string) => {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
      })
      .catch((error) => {
        throw new Error('Status Code: ' + error.code + 'Error Message: ' + error.message);
      });
  };

  logoutFirebaseUser = () => {
    signOut(this.auth);
  };
}
