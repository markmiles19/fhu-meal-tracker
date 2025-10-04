import Separator from '@/components/Separator';
import { Text } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();

  const [remainingLionBucks, setRemainingLionBucks] = useState<number | null>(null);
  const [totalLionBucks, setTotalLionBucks] = useState<number | null>(null);
  const [remainingMeals, setRemainingMeals] = useState<number | null>(null);
  const [totalMeals, setTotalMeals] = useState<number | null>(null);
  const [remainingLionsPride, setRemainingLionsPride] = useState<number | null>(null);
  const [totalLionsPride, setTotalLionsPride] = useState<number | null>(null);
  const [remainingCFA, setRemainingCFA] = useState<number | null>(null);
  const [totalCFA, setTotalCFA] = useState<number | null>(null);

  useEffect(() => {
    setTotalLionBucks(180.0);
    setTotalMeals(14);
    setTotalLionsPride(5);
    setTotalCFA(2);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.modeText}>
          {theme === 'dark' ? '🌙 Dark Mode 🌙' : '☀️ Light Mode ☀️'}
        </Text>

        <Button title="Toggle Theme" onPress={toggleTheme} />

        <Text style={styles.title}>Lion Bucks</Text>
        <CircularProgress
          value={12}
          radius={56}
          maxValue={14}
          duration={1200}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Separator />

        <Text style={styles.title}>Dining Dollars</Text>
        <CircularProgress
          value={12}
          radius={56}
          maxValue={14}
          duration={1200}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Separator />

        <Text style={styles.title}>Jones Dining Hall Meals</Text>
        <CircularProgress
          value={12}
          radius={56}
          maxValue={14}
          duration={1200}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Separator />

        <Text style={styles.title}>Lion's Pride Meals</Text>
        <CircularProgress
          value={12}
          radius={56}
          maxValue={14}
          duration={1200}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Separator />

        <Text style={styles.title}>Chick-Fil-A Meals</Text>
        <CircularProgress
          value={12}
          radius={56}
          maxValue={14}
          duration={1200}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Separator />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingBottom: 100,
  },
  modeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
});