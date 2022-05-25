import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrls: ['./footer-main.component.css']
})
export class FooterMainComponent {
  isFocusRoute$: Subject<boolean>;

  constructor (private routerService: RouterService) {
    this.isFocusRoute$ = this.routerService.isFocusRoute$;
  }
}
