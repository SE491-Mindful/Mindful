import { AngularFirestore } from '@angular/fire/compat/firestore';

import { FirebaseService } from './firebase.service';
import { RouterService } from './router.service';
import { SessionStorageService } from './session-storage.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    service = new FirebaseService({} as AngularFirestore, {} as SessionStorageService, {} as RouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
