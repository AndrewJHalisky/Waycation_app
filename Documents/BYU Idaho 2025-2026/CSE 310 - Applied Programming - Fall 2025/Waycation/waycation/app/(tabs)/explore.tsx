import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Event, Showtime, RootStackParamList } from '../../hooks/showtimes';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParramList = {
  EventList: undefined;
  EventDetail: { selectedItems: Event[] };
};

const Stack = createStackNavigator<RootStackParamList>();

// Load and save functions for storage

const saveEvents = async (events: Event[]) => {
  await AsyncStorage.setItem('events', JSON.stringify(events));
}

const loadEvents = async (): Promise<Event[]> => {
  const data = await AsyncStorage.getItem('events');
  return data ? JSON.parse(data) : [];
}

// Screens would go here
function EventListScreen({ navigation }: any ) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const Events: Event[] = [
      {
        id: '1',
        title: 'Twenty One Pilots Concert',
        description: 'A live concert event',
        date: '2026-07-01',
        showtimes: [
          { id: 's1', time: '7:00 PM', venue: 'Venue 1' },
          { id: 's2', time: '9:00 PM', venue: 'Venue 2' },
        ],
      },
      {
        id: '2',
        title: 'Wicked Live',
        description: 'Broadway show',
        date: '2026-07-02',
        showtimes: [
          { id: 's3', time: '6:00 PM', venue: 'Venue 3' },
        ],
      },
      {
        id: '3',
        title: 'Hamilton',
        description: 'Another Broadway show',
        date: '2026-08-15',
        showtimes: [
          { id: 's4', time: '8:00 PM', venue: 'Venue 4' },
        ],
      },
      {
        id: '4',
        title: 'Green Day Concert',
        description: 'A rocking evening',
        date: '2026-09-10',
        showtimes: [
          { id: 's5', time: '7:30 PM', venue: 'Venue 5' },
        ],
      },
      {
        id: '5',
        title: 'The Lion King',
        description: 'A classic musical',
        date: '2026-10-05',
        showtimes: [
          { id: 's6', time: '5:00 PM', venue: 'Venue 6' },
        ],
      },
      {
        id: '6',
        title: 'Coldplay Live',
        description: 'An unforgettable concert experience',
        date: '2026-11-20',
        showtimes: [
          { id: 's7', time: '8:00 PM', venue: 'Venue 7' },
        ],
      },
      {
        id: '7',
        title: 'Mystical Magic Show',
        description: 'A wonderful show of magic and illusions',
        date: '2025-12-15',
        showtimes: [
          { id: 's8', time: '7:00 PM', venue: 'Venue 8' },
        ],
      },
      {
        id: '8',
        title: 'Imagine Dragons Concert',
        description: 'An electrifying performance',
        date: '2026-01-10',
        showtimes: [
          { id: 's9', time: '9:00 PM', venue: 'Venue 9' },
        ],
      }
    ];
    saveEvents(Events);
    loadEvents().then(setEvents);
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', { event: item })}
          style={{ padding: 12, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
          <Text>{item.date}</Text>
        </TouchableOpacity>
        )}
      />
    </View>
  );
}

function EventDetailScreen({ route }: any) {
  const { event } = route.params;
  
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{event.title}</Text>
      <Text style={{ marginVertical: 8 }}>{event.description}</Text>
      <Text style={{ fontSize: 18, marginTop: 16 }}>Showtimes:</Text>
      <FlatList
        data={event.showtimes}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 4 }}>
            {item.time} @ {item.venue}
          </Text>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="EventList" component={EventListScreen} options={{ title: 'Events' }} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

