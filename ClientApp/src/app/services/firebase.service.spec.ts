
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from './firebase.service';
import { RouterService } from './router.service';
import { SessionStorageService } from './session-storage.service';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let angularFirestore: AngularFirestore;
  let angularFireAuth: AngularFireAuth;
  let sessionStorageService: SessionStorageService;
  let routerService: RouterService;
  let toastrService: ToastrService;

  beforeEach(() => {
    angularFirestore = jasmine.createSpyObj('AngularFirestore', ['collection']);
    angularFireAuth = jasmine.createSpyObj('AngularFireAuth', ['onAuthStateChanged']);
    sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['setAuthenticatedUser', 'getAuthenticatedUser']);
    routerService = jasmine.createSpyObj('RouterService', ['navigate']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    service = new FirebaseService(
      angularFirestore,
      angularFireAuth,
      sessionStorageService,
      toastrService,
      routerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
