import * as Calendar from 'expo-calendar';

let calendarId: string | null = null;

export type Event = {
  id?: string; // Expo Calendar event ID
  title: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
};

export const initMyCalendar = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Calendar permission not granted');
  }

  const calendars = await Calendar.getCalendarsAsync();
  const writable = calendars.find(cal => cal.allowsModifications);

    if (writable) {
    calendarId = writable.id;
  } else {
    // Use the source from the first available calendar (required on Android)
    const source = calendars[0]?.source;
    if (!source) {
      throw new Error('No calendar source available on this device');
    }
  // Create your own calendar
    calendarId = await Calendar.createCalendarAsync({
      title: 'Waycation Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: source.id,
      source: source,
      name: 'Waycation Calendar',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
  }

  return true;
};

/**
 * Add an event.
 */

export const addEvent = async (event: Event): Promise<Event> => {
  if (!calendarId) {
    throw new Error('Calendar not initialized');
  }

  const id = await Calendar.createEventAsync(calendarId, {
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    notes: event.notes,
  });

  return { ...event, id };
};

/**
 * Update an existing event.
 */
export const updateEvent = async (event: Event): Promise<Event> => {
  if (!event.id) {
    throw new Error('Event ID missing — cannot update');
  }

  await Calendar.updateEventAsync(event.id, {
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    notes: event.notes,
  });

  return event;
};

/**
 * Delete an event.
 */
export const deleteEvent = async (eventId: string) => {
  await Calendar.deleteEventAsync(eventId);
};