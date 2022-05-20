import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent {
  loggedInUser: BehaviorSubject<string>;

  // eslint-disable-next-line no-useless-constructor
  constructor (private sessionStorageService: SessionStorageService) {
    this.loggedInUser = sessionStorageService.authenticatedUser$;
  }
}
