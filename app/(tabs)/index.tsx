import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [remainingLionBucks, setRemainingLionBucks] = useState<number | null>(null);
  const [totalLionBucks, setTotalLionBucks] = useState<number | null>(null);

  const [remainingMeals, setRemainingMeals] = useState<number | null>(null);
  const [totalMeals, setTotalMeals] = useState<number | null>(null);
  const [remainingLionsPride, setRemainingLionsPride] = useState<number | null>(null);
  const [totalLionsPride, setTotalLionsPride] = useState<number | null>(null);
  const [remainingCFA, setRemainingCFA] = useState<number | null>(null);
  const [totalCFA, setTotalCFA] = useState<number | null>(null);

  const calculateRemainingLionBucks = (totalLionBucks: number | null) => {
    // Subtract expenses from history.
  }

  const calculateRemainingMeals = (totalMeals: number | null) => {
    // Subtract expenses from history.
  }

  const calculateRemainingLionsPride = (totalLionsPride: number | null) => {
    // Subtract expenses from history.
  }

  const calculateRemainingCFA = (totalCFA: number | null) => {
    // Subtract expenses from history.
  }

  useEffect(() => {
    // Each students gets $180 in Lion Bucks at the beginning of the semester.
    setTotalLionBucks(180.00)

    // Each student gets 14 meal swipes at Jones Dining Hall every week.
    setTotalMeals(14)

    // Each student gets 5 meal swipes at Lion's Pride every week.
    setTotalLionsPride(5)

    // Each student gets 2 meal swipes at Chick-Fil-A every week.
    setTotalCFA(2)

    const remainingLionBucks = calculateRemainingLionBucks(totalLionBucks)
    const remainingMeals = calculateRemainingMeals(totalMeals)
    const remainingLionsPride = calculateRemainingLionsPride(totalLionsPride)
    const remainingCFA = calculateRemainingCFA(totalCFA)
  })

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Home</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
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
