import calendarEvents from 'react-native-calendar-events';

async function requestCalendarPermission() {
  const permission = await calendarEvents.requestPermissions();
  if (permission === 'authorized') {
    console.log("Calendar access granted");
  } else {
    console.log("Calendar access denied");
  }
}