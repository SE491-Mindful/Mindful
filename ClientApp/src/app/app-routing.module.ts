import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
