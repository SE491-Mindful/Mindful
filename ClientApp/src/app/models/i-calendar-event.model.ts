import { EventInput } from '@fullcalendar/angular';

export interface CalendarEvent extends EventInput {
    userId: string | undefined;
}
