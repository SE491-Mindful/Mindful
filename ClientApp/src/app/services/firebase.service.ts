/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signOut, Auth, User } from '@firebase/auth';
import { SessionStorageService } from './session-storage.service';
import { RouterService } from './router.service';
import { ICreateUserResultModel } from '../models/i-createUser-result.model';
import { ILoginUserResultModel } from '../models/i-loginUser-result.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';
import { first, map } from 'rxjs';
import { IPreferencesFormModel } from '../models/i-preferencesForm.model';
import { CalendarEvent } from '../models/i-calendar-event.model';
import { AppRoutes } from '../constants/app.constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth: Auth;
  authUser: User | undefined;

  constructor (
    private store: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private sessionStorage: SessionStorageService,
    private toastrService: ToastrService,
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

  // Logs into firebsae with an existing username and email / not 3rd party auth... Firebase stores these credentials safely for us.
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

  // Logs into firebase with a Google Popup.
  loginGoogleFirebase = () => {
    return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredential) => {
        console.log('User authenticated successfully with google.');
        return { success: true } as ILoginUserResultModel;
      }).catch((error: Error) => {
        console.error('Failed to authenticate with Google.');
        return { success: false, error: { errorMessage: error.message } } as ILoginUserResultModel;
      });
  };

  logoutFirebaseUser = () => {
    if (this.authUser) {
      signOut(this.auth);
      this.sessionStorage.clear();
    }
  };

  saveCalendarEvent = async (event:CalendarEvent) => {
    if (event.id === undefined || event.id === '') {
      this.getEventsCollection().get().subscribe(data => {
        event.id = uuidv4();
        event.userId = this.authUser?.uid;
        this.store.collection('events').add(event);
      });
    } else {
      this.getEventsCollection(event.id).get().subscribe(data => {
        this.store.collection('events').doc(data.docs[0].id).update(event);
      });
    }
  };

  deleteCalendarEvent = async (id:string) => {
    this.getEventsCollection(id).get().subscribe(data => {
      if (data.docs.length === 1) {
        this.store.collection('events').doc(data.docs[0].id).delete();
      }
    });
  };

  getUserCalendarEvents = () => {
    return this.getEventsCollection().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  };

  saveUserPreferences = async (preferences: IPreferencesFormModel) => {
    if (preferences.userId === undefined || preferences.userId === '' || preferences.userId === null) {
      this.getPreferencesCollection().get().subscribe(data => {
        preferences.userId = this.authUser?.uid ?? 'BAD USER ID DATA';
        this.store.collection('preferences').add(preferences).then(() => {
          this.toastrService.success('Preferences Updated.');
          this.routerService.navigate(AppRoutes.Calendar);
        });
      });
    } else {
      this.getPreferencesCollection().get().subscribe(data => {
        this.store.collection('preferences').doc(data.docs[0].id).update(preferences).then(() => {
          this.toastrService.success('Preferences Saved.');
          this.routerService.navigate(AppRoutes.Calendar);
        });
      });
    }
  };

  getUserPreferences = () => {
    return this.getPreferencesCollection().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      first()
    );
  };

  private getPreferencesCollection = (): AngularFirestoreCollection<IPreferencesFormModel> => {
    return this.store.collection('preferences', ref => ref.where('userId', '==', this.authUser?.uid));
  };

  private getEventsCollection = (eventId: string = ''): AngularFirestoreCollection<CalendarEvent> => {
    if (eventId.length > 0) { return this.store.collection('events', ref => ref.where('id', '==', eventId)); }
    return this.store.collection('events', ref => ref.where('userId', '==', this.authUser?.uid));
  };
}
