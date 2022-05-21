import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent {
  isLoginRoute$: Subject<boolean>;
  isPreferencesRoute$: Subject<boolean>;
  isFocusRoute$: Subject<boolean>;
  isUserAuthenticated$: Subject<boolean>;

  constructor (
    private sessionStoreService: SessionStorageService,
    private routerService: RouterService) {
    this.isUserAuthenticated$ = this.sessionStoreService.isUserAuthenticated$;
    this.isLoginRoute$ = this.routerService.isLoginRoute$;
    this.isFocusRoute$ = this.routerService.isFocusRoute$;
    this.isPreferencesRoute$ = this.routerService.isPreferencesRoute$;
  }
}
