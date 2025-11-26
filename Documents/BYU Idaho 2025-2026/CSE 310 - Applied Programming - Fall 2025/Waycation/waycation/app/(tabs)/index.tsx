import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

// import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// The main home screen
export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/blue_sea_with_sky.png')}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
      }>
        <Image
          source={require('@/assets/images/WAYcation_logo.png')}
          style={{ width: 375, height: 265, alignSelf: 'flex-start', marginTop: 20 }}
        />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to WAYcation</ThemedText>
      </ThemedView>
      <ThemedText>Your gateway to unforgettable travel experiences.</ThemedText>
      <ThemedText>
        Start by exploring destinations, planning your trip, and booking accommodations all in one place.
      </ThemedText>
      <ThemedText>
        Ready to embark on your next adventure? Let's get started!
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
