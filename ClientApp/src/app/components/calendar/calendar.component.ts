import { formatDate } from '@angular/common';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Timestamp } from 'firebase/firestore';
import { Subject, takeUntil } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
// import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnDestroy {
  // references the #calendar in the template
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent | undefined;

  // Modal- START
  description: string = 'How Long were you Mindful Today?';
  duration: number | undefined = undefined;
  date:string | undefined = formatDate(Date.now(), 'YYYY-MM-dd', 'en_US');
  isModalOpen = false;
  // Modal - END

  userEvents: any[] = [];
  $destroy = new Subject<boolean>();
  // eslint-disable-next-line no-useless-constructor
  constructor (private fireService: FirebaseService) {
  }

  closeModal = () => { this.isModalOpen = false; };

  showModal = () => { this.isModalOpen = true; };

  saveModal = () => {
    const event = {
      title: 'Mindful for ' + this.duration + ' minutes.',
      start: new Date(this.date + 'T00:00:00'),
      allDay: true
    } as EventInput;

    this.calendarComponent?.getApi().addEvent(event);
    console.log(this.calendarComponent?.getApi().getEvents());
    this.fireService.saveCalendarEvent(event);
    this.closeModal();
  };

  ngOnDestroy (): void {
    this.userEvents = [];
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit () {
    // This is a bit of a hack to convert Firebase Timestamp obj to DateTime objects in Javascript.. but it works for now.
    this.fireService.getUserCalendarEvents()
      .subscribe((data: any[]) => {
        data.forEach(d => { d.start = (<Timestamp>d.start).toDate(); });
        this.userEvents = data;
        // this.userEvents.forEach(event => { event.start = '2022-06-10'; });
        this.requestCalendarData();
      },
      takeUntil(this.$destroy));
  }

  requestCalendarData = () => {
    // console.log('Calendar Events: ' + JSON.stringify(this.calendarComponent?.getApi().getEvents()));
    // console.log('Firebase Events: ' + JSON.stringify(this.userEvents));
    this.calendarComponent?.getApi()?.batchRendering(() => {
      this.calendarComponent?.getApi()?.removeAllEvents();
      this.calendarComponent?.getApi()?.addEventSource(this.userEvents);
    });
  };

  // function used in FullCalendarComponent CalendarOptions to setup the calendar's click event.
  addEventClick = (): void => { this.isModalOpen = true; };

  dateClick = (info: { dateStr: string; resource: { id: string; }; }): void => {
    // eslint-disable-next-line no-undef
    alert('Date: ' + info.dateStr);
    // eslint-disable-next-line no-undef
    alert('Resource ID: ' + info.resource.id);
  };

  // TODO: implement me.
  eventClick = (info: { event: any; jsEvent: { preventDefault: () => void; }; }): void => {
    const eventObj = info.event;
    // eslint-disable-next-line no-undef
    alert('Event: ' + eventObj.title);
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
        text: 'Log New Meditation',
        click: this.addEventClick
      }
    },
    // dateClick: this.dateClick.bind(this),
    eventClick: this.addEventClick.bind(this)
  };
}
