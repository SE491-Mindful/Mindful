import { EventInput } from '@fullcalendar/angular';

export interface CalendarEvent extends EventInput {
    timeMinutes: number | undefined;
    userId: string | undefined;
}
