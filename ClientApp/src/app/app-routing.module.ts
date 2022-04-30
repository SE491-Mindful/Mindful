import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { PreferencesMainComponent } from './components/preferences-main/preferences-main.component';
import { AppRoutes } from './constants/app.constants';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: AppRoutes.Login,
    component: LoginComponent
  },
  {
    path: AppRoutes.Calendar,
    component: CalendarComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: AppRoutes.Preferences,
    component: PreferencesMainComponent,
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
