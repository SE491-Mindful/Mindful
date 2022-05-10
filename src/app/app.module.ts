import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PreferencesButtonComponent } from './components/preferences-button/preferences-button.component';
import { PreferencesMainComponent } from './components/preferences-main/preferences-main.component';
import { LocalStorageService } from './services/local-storage.service';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { PreferencesFormComponent } from './components/preferences-form/preferences-form.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    PreferencesButtonComponent,
    PreferencesMainComponent,
    CreateAccountComponent,
    PreferencesFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [LocalStorageService, Storage],
  bootstrap: [AppComponent]
})
export class AppModule { }
