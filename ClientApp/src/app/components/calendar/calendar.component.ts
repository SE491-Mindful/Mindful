import { formatDate } from '@angular/common';
import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Timestamp } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CalendarEvent } from 'src/app/models/i-calendar-event.model';
import { PreferencesFormModel } from 'src/app/models/preferencesForm.model';
import { FirebaseService } from 'src/app/services/firebase.service';
// import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  // references the #calendar in the template
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent | undefined;

  // Modal- START
  description: string = 'How Long were you Mindful Today?';
  eventDescription: string | undefined = undefined;
  eventColor: string | undefined = undefined;
  date:string | undefined = formatDate(Date.now(), 'YYYY-MM-dd', 'en_US');
  isModalOpen = false;
  currentEventId: string = '';
  // Modal - END

  userPreferences: PreferencesFormModel = {} as PreferencesFormModel;
  userEvents: any[] = [];
  destroyed$ = new Subject<boolean>();
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private toastrService: ToastrService,
    private fireService: FirebaseService) {
  }

  ngOnDestroy (): void {
    this.userEvents = [];
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit () {
    this.fireService.getUserPreferences().subscribe(data => {
      this.userPreferences = data[0] ?? {} as PreferencesFormModel;
      this.description = this.userPreferences.trackingDescription;
    }, takeUntil(this.destroyed$));

    // This is a bit of a hack to convert Firebase Timestamp obj to DateTime objects in Javascript.. but it works for now.
    this.fireService.getUserCalendarEvents()
      .subscribe((data: any[]) => {
        data.forEach(d => { d.start = (<Timestamp>d.start).toDate(); });
        this.userEvents = data;
        // this.userEvents.forEach(event => { event.start = '2022-06-10'; });
        this.requestCalendarData();
      },
      takeUntil(this.destroyed$));
  }

  // MODAL functions - START
  closeModal = () => { this.isModalOpen = false; this.currentEventId = ''; };

  showModal = () => { this.isModalOpen = true; };

  saveModal = async () => {
    const event = {
      id: this.currentEventId,
      title: this.eventDescription,
      start: new Date(this.date + 'T00:00:00'),
      color: this.eventColor,
      allDay: true
    } as CalendarEvent;

    if (this.eventDescription == null || this.eventDescription === undefined) {
      this.toastrService.error('Description is Required.');
    } else if (event.color == null || event.color === undefined) {
      this.toastrService.error('Color is Required.');
    } else {
      this.calendarComponent?.getApi().addEvent(event);
      await this.fireService.saveCalendarEvent(event).then(() => {
        this.toastrService.success('Event Created.');
      }).catch((err) => {
        this.toastrService.error(err);
      });
      this.closeModal();
    }
  };

  deleteModal = async () => {
    await this.fireService.deleteCalendarEvent(this.currentEventId).then(() => {
      this.toastrService.success('Event Deleted.');
      this.closeModal();
    }).catch((err) => {
      this.toastrService.error(err);
    });
  };

  // MODAL functions - END

  dateClick = (info: any) => {
    // console.log(info.date);
    this.date = formatDate(info.date, 'YYYY-MM-dd', 'en_US');
    // console.log(this.date);
  };

  // START - CalendarOptions obj configuration and event functions.
  // function used in FullCalendarComponent CalendarOptions to setup the calendar's click event.
  addEventClick = (): void => {
    this.eventDescription = undefined;
    this.isModalOpen = true;
  };

  eventClick = (info: { event: EventApi; jsEvent: { preventDefault: () => void; }; }): void => {
    const eventObj = info.event;
    console.log(eventObj);

    this.date = formatDate(eventObj.start ?? Date.now(), 'YYYY-MM-dd', 'en_US');
    this.eventDescription = eventObj.title;
    this.currentEventId = eventObj.id;
    this.showModal();
  };

  eventDrag = async (info: { event: EventApi; jsEvent: { preventDefault: () => void; }; }): Promise<void> => {
    const eventObj = info.event;

    const newEvent = {
      id: eventObj.id,
      title: eventObj.title,
      start: eventObj.start,
      color: eventObj.backgroundColor,
      allDay: eventObj.allDay
    } as CalendarEvent;

    await this.fireService.saveCalendarEvent(newEvent);
  };

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    eventDisplay: '',
    defaultRangeSeparator: '',
    titleRangeSeparator: '',
    defaultTimedEventDuration: '',
    defaultAllDayEventDuration: {
      day: 1
    },
    forceEventDuration: true,
    nextDayThreshold: '',
    dayHeaders: true,
    initialView: 'dayGridMonth',
    aspectRatio: 1,
    headerToolbar: {
      start: 'addEventButton',
      center: '',
      end: 'dayGridMonth today prev next'
    },
    weekends: true,
    weekNumbers: true,
    // weekNumberCalculation:
    editable: true,
    nowIndicator: true,
    // scrollTime: '',
    // scrollTimeReset: true,
    // slotMinTime: '',
    // slotMaxTime: '',
    // showNonCurrentDates: true,
    // lazyFetching: true,
    // startParam: '',
    // endParam: '',
    // timeZoneParam: '',
    // timeZone: '',
    // locales: [],
    // locale: '',
    themeSystem: 'bootstrap',
    dragRevertDuration: 1,
    // dragScroll: true,
    // allDayMaintainDuration: true,
    // unselectAuto: true,
    // dropAccept: '',
    // eventOrder: '',
    dayPopoverFormat: {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    },
    handleWindowResize: true,
    windowResizeDelay: 0,
    longPressDelay: 0,
    eventDragMinDistance: 0,
    expandRows: true,
    navLinks: true,
    selectable: true,
    eventMinHeight: 0,
    eventMinWidth: 0,
    eventShortHeight: 0,

    customButtons: {
      addEventButton: {
        text: 'Add Event',
        click: this.addEventClick
      }
    },
    dateClick: this.dateClick.bind(this),
    eventClick: this.eventClick.bind(this),
    eventDrop: this.eventDrag.bind(this)
  };
  // END - CalendarOptions obj configuration and event functions.

  // START - Helper functions for calendar component.
  colorSelected = (eventColor: string): void => {
    switch (eventColor) {
      case 'color1': this.eventColor = this.userPreferences.color1;
        break;
      case 'color2': this.eventColor = this.userPreferences.color2;
        break;

      case 'color3': this.eventColor = this.userPreferences.color3;
        break;

      case 'color4': this.eventColor = this.userPreferences.color4;
        break;

      case 'color5': this.eventColor = this.userPreferences.color5;
        break;

      case 'color6': this.eventColor = this.userPreferences.color6;
        break;

      default: this.eventColor = this.userPreferences.color1;
    }
  };

  private requestCalendarData = () => {
    this.calendarComponent?.getApi()?.batchRendering(() => {
      this.calendarComponent?.getApi()?.removeAllEvents();
      this.calendarComponent?.getApi()?.addEventSource(this.userEvents);
    });
  };
}
