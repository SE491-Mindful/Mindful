/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import { formatDate } from '@angular/common';
import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Timestamp } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CalendarEvent } from 'src/app/models/i-calendar-event.model';
import { ICreateEventModel } from 'src/app/models/i-createEvent.model';
import { IDailyOverviewModel } from 'src/app/models/i-dailyOverview.model';
import { IPreferencesFormModel } from 'src/app/models/i-preferencesForm.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnDestroy {
  // references the #calendar in the template
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent | undefined;

  dailyOverviewModel = {} as IDailyOverviewModel;
  isOverviewModelOpen = false;

  currentEventModel = {
    date: formatDate(Date.now(), 'YYYY-MM-dd', 'en_US') + 'T00:00:00'
  } as ICreateEventModel;

  isModalOpen = false;

  userPreferences: IPreferencesFormModel = {} as IPreferencesFormModel;
  userEvents: any[] = [];
  destroyed$ = new Subject<boolean>();

  constructor (
    private toastrService: ToastrService,
    private fireService: FirebaseService) {
    this.fireService.getUserPreferences().subscribe(data => {
      this.userPreferences = data[0] ?? {} as IPreferencesFormModel;
      this.currentEventModel.title = this.userPreferences.trackingDescription;
      this.currentEventModel.color1 = this.userPreferences.color1;
      this.currentEventModel.color2 = this.userPreferences.color2;
      this.currentEventModel.color3 = this.userPreferences.color3;
      this.currentEventModel.color4 = this.userPreferences.color4;
      this.currentEventModel.color5 = this.userPreferences.color5;
      this.currentEventModel.color6 = this.userPreferences.color6;
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

  ngOnDestroy (): void {
    this.userEvents = [];
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // MODAL functions - START
  closeOverviewModal = () => { this.isOverviewModelOpen = false; };

  showOverviewModal = () => { this.isOverviewModelOpen = true; };

  closeModal = () => { this.isModalOpen = false; this.currentEventModel.id = ''; };

  showModal = () => { this.isModalOpen = true; };

  saveModal = async () => {
    const tempEvent = {
      id: this.currentEventModel.id,
      title: this.currentEventModel.eventDescription,
      timeMinutes: this.currentEventModel.timeMinutes,
      start: new Date(this.currentEventModel.date + 'T00:00:00'),
      color: this.currentEventModel.selectedColor,
      allDay: true
    } as CalendarEvent;

    // Error cases before saving modal.
    if (this.currentEventModel.eventDescription == null || this.currentEventModel.eventDescription === undefined) {
      this.toastrService.error('Description is Required.');
    } else if (tempEvent.color == null || tempEvent.color === undefined) {
      this.toastrService.error('Color is Required.');
    } else if (tempEvent.timeMinutes == null || tempEvent.timeMinutes === undefined) {
      this.toastrService.error('Number of Minutes is Required.');
    } else {
      let totalMinutes = 0;
      const currentDate = new Date(formatDate(Date.now(), 'YYYY-MM-dd', 'en_US') + 'T00:00:00');
      this.userEvents.push(tempEvent);
      this.userEvents.forEach((e:CalendarEvent) => {
        if ((<Date>e?.start)?.getDate() === currentDate.getDate()) {
          totalMinutes += e?.timeMinutes ?? 0;
        }
      });
      if (totalMinutes > this.userPreferences.dailyMinuteGoal && !this.dailyOverviewModel.hasSeen) {
        this.dailyOverviewModel.description = this.userPreferences.trackingDescription + ': ' + totalMinutes + ' minutes.';
        this.showOverviewModal();
        this.dailyOverviewModel.hasSeen = true;
      }
      this.calendarComponent?.getApi().addEvent(tempEvent);
      await this.fireService.saveCalendarEvent(tempEvent).then(() => {
        this.toastrService.success('Event Created.');
      }).catch((err) => {
        this.toastrService.error(err);
      });
      this.closeModal();
    }
  };

  deleteModal = async () => {
    await this.fireService.deleteCalendarEvent(this.currentEventModel.id).then(() => {
      this.toastrService.success('Event Deleted.');
      this.closeModal();
    }).catch((err) => {
      this.toastrService.error(err);
    });
  };

  // MODAL functions - END

  // START - CalendarOptions obj configuration and event functions.
  // function used in FullCalendarComponent CalendarOptions to setup the calendar's click event.
  dateClick = (info: any) => {
    this.currentEventModel.date = formatDate(info.date, 'YYYY-MM-dd', 'en_US');
  };

  addEventClick = (): void => {
    this.currentEventModel.eventDescription = undefined;
    this.isModalOpen = true;
    this.currentEventModel.title = this.userPreferences.trackingDescription;
  };

  eventClick = (info: { event: EventApi; jsEvent: { preventDefault: () => void; }; }): void => {
    const eventObj = info.event;
    console.log(eventObj);

    this.currentEventModel.date = formatDate(eventObj.start ?? Date.now(), 'YYYY-MM-dd', 'en_US');
    this.currentEventModel.eventDescription = eventObj.title;
    this.currentEventModel.id = eventObj.id;
    this.showModal();
  };

  eventDrag = async (info: { event: EventApi; jsEvent: { preventDefault: () => void; }; }): Promise<void> => {
    const eventObj = info.event;

    const newEvent = {
      id: eventObj.id,
      title: eventObj.title,
      timeMinutes: eventObj.extendedProps['timeMinutes'],
      userId: eventObj.extendedProps['userId'],
      start: eventObj.start,
      color: eventObj.backgroundColor,
      allDay: eventObj.allDay
    } as CalendarEvent;

    await this.fireService.saveCalendarEvent(newEvent);
  };

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
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
      case 'color1': this.currentEventModel.selectedColor = this.userPreferences.color1;
        break;
      case 'color2': this.currentEventModel.selectedColor = this.userPreferences.color2;
        break;

      case 'color3': this.currentEventModel.selectedColor = this.userPreferences.color3;
        break;

      case 'color4': this.currentEventModel.selectedColor = this.userPreferences.color4;
        break;

      case 'color5': this.currentEventModel.selectedColor = this.userPreferences.color5;
        break;

      case 'color6': this.currentEventModel.selectedColor = this.userPreferences.color6;
        break;

      default: this.currentEventModel.selectedColor = this.userPreferences.color1;
    }
  };

  private requestCalendarData = () => {
    this.calendarComponent?.getApi()?.batchRendering(() => {
      this.calendarComponent?.getApi()?.removeAllEvents();
      this.calendarComponent?.getApi()?.addEventSource(this.userEvents);
    });
  };
}
