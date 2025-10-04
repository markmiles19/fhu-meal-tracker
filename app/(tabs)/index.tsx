import Separator from '@/components/Separator';
import { Text } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { Button, ScrollView, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();

  const { totalSpent } = useTransactions();
  const totalLionBucks = 180.00;
  const remainingLionBucks = totalLionBucks - totalSpent;
  const percentageLionBucks = (remainingLionBucks / totalLionBucks) * 100;

  const totalDD = 14;
  const remainingDD = totalDD - totalSpent;
  const percentageDD = (remainingDD / totalDD) * 100;

  const totalMeals = 14;
  const remainingMeals = totalMeals - totalSpent;
  const percentageMeals = (remainingMeals / totalMeals) * 100;

  const totalLionsPride = 5;
  const remainingLionsPride = totalLionsPride - totalSpent;
  const percentageLionsPride = (remainingLionsPride / totalLionsPride) * 100;

  const totalCFA = 2;
  const remainingCFA = totalCFA - totalSpent;
  const percentageCFA = (remainingCFA / totalCFA) * 100;

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

        {/* LION BUCKS */}
        <Text style={styles.title}>Lion Bucks</Text>
        <CircularProgress
          value={percentageLionBucks}
          radius={56}
          maxValue={14}
          duration={100}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Text style={styles.subtitle}>
          Total Remaining: $
        </Text>
        <Separator />

        {/* DINING DOLLARS */}
        <Text style={styles.title}>Dining Dollars</Text>
        <CircularProgress
          value={percentageDD}
          radius={56}
          maxValue={14}
          duration={100}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Text style={styles.subtitle}>
          Total Remaining: $
        </Text>
        <Separator />

        {/* JONES MEALS */}
        <Text style={styles.title}>Jones Dining Hall Meals</Text>
        <CircularProgress
          value={percentageMeals}
          radius={56}
          maxValue={14}
          duration={100}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Text style={styles.subtitle}>
          Total Remaining: $
        </Text>
        <Separator />

        {/* LION'S PRIDE */}
        <Text style={styles.title}>Lion's Pride Meals</Text>
        <CircularProgress
          value={percentageLionsPride}
          radius={56}
          maxValue={14}
          duration={100}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Text style={styles.subtitle}>
          Total Remaining: $
        </Text>
        <Separator />

        {/* CHICK-FIL-A */}
        <Text style={styles.title}>Chick-Fil-A Meals</Text>
        <CircularProgress
          value={percentageCFA}
          radius={56}
          maxValue={14}
          duration={100}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor="#6C5CE7"
          inActiveStrokeColor="#E8EAF0"
          progressValueStyle={{ fontWeight: '600' }}
          valueSuffix="%"
        />
        <Text style={styles.subtitle}>
          Total Remaining: $
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