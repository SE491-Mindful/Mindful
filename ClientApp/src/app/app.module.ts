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
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { FocusMainComponent } from './components/focus-main/focus-main.component';
import { FocusButtonComponent } from './components/focus-button/focus-button.component';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { FooterMainComponent } from './components/footer-main/footer-main.component';

import { environment } from 'src/environments/environment';

// firestore imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

// Full Calendar Imports:
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOverviewComponent } from './components/calendar-overview/calendar-overview.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarButtonComponent } from './components/calendar-button/calendar-button.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    PreferencesButtonComponent,
    PreferencesMainComponent,
    CreateAccountComponent,
    FocusMainComponent,
    FocusButtonComponent,
    HeaderMainComponent,
    LogoutButtonComponent,
    FooterMainComponent,
    CalendarOverviewComponent,
    CalendarButtonComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FullCalendarModule,
    ColorPickerModule,
    HttpClientModule
  ],
  providers: [LocalStorageService, Storage, FirebaseService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
