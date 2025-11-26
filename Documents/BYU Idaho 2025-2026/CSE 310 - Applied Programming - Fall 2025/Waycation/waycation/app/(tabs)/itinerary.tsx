import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, StyleSheet } from 'react-native';
import * as Calendar from 'expo-calendar';

type Event = {
  id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
};

export default function ItineraryScreen() {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [calendarId, setCalendarId] = useState<string | null>(null);

  // Initialize: request permission and pick a writable calendar
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission not granted');
          return;
        }

        const calendars = await Calendar.getCalendarsAsync();
        const writable = calendars.find(cal => cal.allowsModifications);

        if (!writable) {
          Alert.alert('No writable calendar found on this device');
          return;
        }

        setCalendarId(writable.id);

        // Load upcoming events
        const now = new Date();
        const oneYearLater = new Date();
        oneYearLater.setFullYear(now.getFullYear() + 1);
        const deviceEvents = await Calendar.getEventsAsync([writable.id], now, oneYearLater);

        setEvents(
          deviceEvents.map(ev => ({
            id: ev.id,
            title: ev.title,
            startDate: new Date(ev.startDate),
            endDate: new Date(ev.endDate),
            notes: ev.notes || undefined,
          }))
        );
      } catch (e: any) {
        Alert.alert('Error', e.message);
      }
    })();
  }, []);

  const handleAdd = async () => {
    try {
      if (!calendarId) {
        Alert.alert('Calendar not ready');
        return;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        Alert.alert('Invalid date format. Use YYYY-MM-DD.');
        return;
      }

      const id = await Calendar.createEventAsync(calendarId, {
        title: title || 'Untitled Event',
        startDate: start,
        endDate: end,
      });

      Alert.alert('Success', 'Event added!');

      // Refresh events
      const now = new Date();
      const oneYearLater = new Date();
      oneYearLater.setFullYear(now.getFullYear() + 1);
      const deviceEvents = await Calendar.getEventsAsync([calendarId], now, oneYearLater);

      setEvents(
        deviceEvents.map(ev => ({
          id: ev.id,
          title: ev.title,
          startDate: new Date(ev.startDate),
          endDate: new Date(ev.endDate),
          notes: ev.notes || undefined,
        }))
      );

      setTitle('');
      setStartDate('');
      setEndDate('');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <Button title="Add Event" onPress={handleAdd} disabled={!calendarId} />
      
      <Text style={styles.heading}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>
              {item.startDate.toDateString()} - {item.endDate.toDateString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  eventItem: { marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
});