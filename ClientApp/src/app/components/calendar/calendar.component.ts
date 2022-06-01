import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // references the #calendar in the template
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent | undefined;

  // eslint-disable-next-line no-useless-constructor
  constructor () {
  }

  // function used in FullCalendarComponent CalendarOptions to setup the calendar's click event.
  addEventClick = (): void => {
    const currentDate = formatDate(Date.now(), 'YYYY-MM-dd', 'en_US');
    // eslint-disable-next-line no-undef
    const dateStr = prompt('Enter a date in YYYY-MM-DD format', currentDate);
    const date = new Date(dateStr + 'T00:00:00'); // will be in local time
    // eslint-disable-next-line no-undef
    const duration = prompt('Enter the number of minutes you used Mindful today');

    if (!isNaN(date.valueOf())) { // valid?
      this.calendarComponent?.getApi().addEvent({
        title: 'New Meditation for ' + duration + ' minutes.',
        start: date,
        allDay: true
      });

      console.log(this.calendarComponent?.getApi().getEvents());
      // eslint-disable-next-line no-undef
      alert('Great. Now, update your database...');
    } else {
      // eslint-disable-next-line no-undef
      alert('Invalid date.');
    }
  };

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
    }
    // dateClick: this.dateClick.bind(this),
    // eventClick: this.addEventClick.bind(this)
  };
}
