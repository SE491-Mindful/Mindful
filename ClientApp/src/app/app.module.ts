import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PreferencesButtonComponent } from './components/preferences-button/preferences-button.component';
import { PreferencesMainComponent } from './components/preferences-main/preferences-main.component';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    PreferencesButtonComponent,
    PreferencesMainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [LocalStorageService, Storage],
  bootstrap: [AppComponent]
})
export class AppModule { }
