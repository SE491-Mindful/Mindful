/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signOut, Auth, User } from '@firebase/auth';
import { SessionStorageService } from './session-storage.service';
import { RouterService } from './router.service';
import { ICreateUserResultModel } from '../models/i-createUser-result.model';
import { ILoginUserResultModel } from '../models/i-loginUser-result.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth: Auth;
  authUser: User | undefined;

  constructor (
    private store: AngularFirestore,
    private sessionStorage: SessionStorageService,
    private routerService: RouterService) {
    this.auth = getAuth();

    // Sets up state change around auth and does some things for our app based on those changes, mainly clearing our session storage.
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
        this.sessionStorage.setAuthenticatedUser(user.email ?? '');
        this.routerService.navigateFromLogin();
      } else {
        this.authUser = undefined;
      }
    });
  };

  // Creates a user in the Firebase db to store these credentials safely for us, abstracting all complexity of login for us.
  createUserFirebase = (email: string, password: string): Promise<ICreateUserResultModel> => {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Added user successfully to database.');
        return { success: true } as ICreateUserResultModel;
      })
      .catch((error : Error) => {
        console.error('Failed to Create User.');
        return { success: false, error: { errorMessage: error.message } } as ICreateUserResultModel;
      });
  };

  // Logs into firebsae with an existing username and email / not 3rd party auth... Firebsae stores these credentials safely for us.
  loginEmailFirebase = (email: string, password: string): Promise<ILoginUserResultModel> => {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('User authenticated successfully with database.');
        return { success: true } as ILoginUserResultModel;
      })
      .catch((error : Error) => {
        console.error('Failed to Create User.');
        return { success: false, error: { errorMessage: error.message } } as ILoginUserResultModel;
      });
  };

  // TODO: implement google auth through firebase.. there's a nifty tutorial on their firebase console under authentication.

  logoutFirebaseUser = () => {
    if (this.authUser) {
      signOut(this.auth);
      this.sessionStorage.clear();
    }
  };
}
