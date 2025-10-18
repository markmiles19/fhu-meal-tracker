import Separator from '@/components/Separator';
import { Text } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';

const BASE_URL = "https://api.fhumealtracker.fhu.edu/data.json"

export default async function HomeScreen() {
  const { totalsByTag } = useTransactions();

  const getData = async () => {
    const response = await fetch(BASE_URL)
    const data = await response.json()

    console.log(data)

    setMealsRemaining(data.meals.remaining);
  }

  useEffect(()=> {
    getData()
  }, []);

  const [mealsRemaining, setMealsRemaining] = useState(0)

  const { theme, toggleTheme } = useTheme();

  const totalLionBucks = 180.00;
  // const remainingLionBucks = totalLionBucks - totalsByTag['LionBucks'];

  const totalDD = 150.00;
  const remainingDD = totalDD - totalsByTag['Starbucks'];

  const totalMeals = 14;
  const remainingMeals = totalMeals - totalsByTag['Jones'];

  const totalLionsPride = 5;
  const remainingLionsPride = totalLionsPride - totalsByTag['LP'];

  const totalCFA = 2;
  const remainingCFA = totalCFA - totalsByTag['CFA'];

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

        <Separator />

        {/* JONES MEALS */}
        <Text style={styles.title}>Jones Dining Hall Meals</Text>
        <CircularProgress
          value={remainingMeals}
          radius={56}
          maxValue={14}
          duration={14}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#f44949ff"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
        />
        <Text style={styles.subtitle}>
          Total: {totalMeals}
        </Text>
        <Separator />

        {/* LION'S PRIDE */}
        <Text style={styles.title}>Lion's Pride Meals</Text>
        <CircularProgress
          value={remainingLionsPride}
          radius={56}
          maxValue={5}
          duration={5}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#f44949ff"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
        />
        <Text style={styles.subtitle}>
          Total: {totalLionsPride}
        </Text>
        <Separator />

        {/* DINING DOLLARS */}
        <Text style={styles.title}>Dining Dollars</Text>
        <CircularProgress
          value={remainingDD}
          radius={56}
          maxValue={150}
          duration={150}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#f44949ff"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valuePrefix="$"
        />
        <Text style={styles.subtitle}>
          Total: ${totalDD}
        </Text>
        <Separator />

        {/* CHICK-FIL-A */}
        <Text style={styles.title}>Chick-Fil-A Meals</Text>
        <CircularProgress
          value={remainingCFA}
          radius={56}
          maxValue={2}
          duration={2}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#f44949ff"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
        />
        <Text style={styles.subtitle}>
          Total: {totalCFA}
        </Text>
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
  subtitle: {
    marginTop: 20,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
});

// Find the proper way to import transactions and calculate remaining.