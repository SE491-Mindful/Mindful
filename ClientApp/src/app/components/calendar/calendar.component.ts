import { Component, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: 'addEventButton'
    },
    customButtons: {
      addEventButton: {
        text: 'add event...',
        click: function () {
          // eslint-disable-next-line no-undef
          var dateStr = prompt('Enter a date in YYYY-MM-DD format');
          var date = new Date(dateStr + 'T00:00:00'); // will be in local time

          if (!isNaN(date.valueOf())) { // valid?
            this.calendarComponent?.getApi().addEvent({ // TODO: add a function down below to utilize FullCalendar component
              title: 'dynamic event',
              start: date,
              allDay: true
            });
            // eslint-disable-next-line no-undef
            alert('Great. Now, update your database...');
          } else {
            // eslint-disable-next-line no-undef
            alert('Invalid date.');
          }
        }
      }
    }
  };
}
