import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/constants/app.constants';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-calendar-button',
  templateUrl: './calendar-button.component.html',
  styleUrls: ['./calendar-button.component.css']
})
export class CalendarButtonComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor (private routerService: RouterService) { }
  onClick = () => {
    this.routerService.navigate(AppRoutes.Calendar);
  };
}
