import { Text, View } from '@/components/Themed';
import React, { useMemo } from 'react';
import { SectionList, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CURRENCY = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
});

const TAG_STYLES = {
  Starbucks: { bg: '#009933', text: '#ffffffff' },
  LP:        { bg: '#faff6aff', text: '#000000ff' },
  CFA:       { bg: '#f24141ff', text: '#ffffffff' },
  Jones:     { bg: '#2790ffff', text: '#ffffffff' },
};

const SECTIONS = [
  {
    date: '2025-09-29',
    data: [
      { id: '0929-1', amount: 6.45, description: 'Iced latte', tag: 'Starbucks' },
      { id: '0929-2', amount: 1, description: 'Lunch Meal Swipe', tag: 'Jones' },
      { id: '0929-3', amount: 1, description: 'Dinner Meal Swipe', tag: 'LP' },
    ],
  },
  {
    date: "2025-10-01",
    data: [
      { id: '1001-1', amount: 1, description: "Breakfast Meal Swipe", tag: "Jones" },
      { id: '1001-2', amount: 5.95, description: "Latte", tag: "Starbucks" },
      { id: '1001-3', amount: 1, description: "Dinner Meal Swipe", tag: "Jones" },
    ],
  },
  {
    date: "2025-10-02",
    data: [
      { id: '1002-1', amount: 1, description: "Breakfast Meal Swipe", tag: "LP" },
      { id: '1002-2', amount: 4.85, description: "Cookie", tag: "Starbucks" },
      { id: '1002-3', amount: 1, description: "Dinner Meal Swipe", tag: "Jones" },
    ]
  },
  {
    date: "2025-10-03",
    data: [
      { id: '1003-1', amount: 1, description: "Lunch Meal Swipe", tag: "Jones" },
      { id: '1003-2', amount: 1, description: "Dinner Meal Swipe", tag: "Jones" },
      { id: '1003-3', amount: 4.15, description: "Coffee", tag: "Starbucks" },
    ],
  },
  {
    date: "2025-10-04",
    data: [
      { id: '1004-1', amount: 5.65, description: "Flat White", tag: "Starbucks" },
      { id: '1004-2', amount: 1, description: "Lunch Meal Swipe", tag: "LP" },
      { id: '1004-3', amount: 1, description: "Chick-Fil-A Sandwich", tag: "CFA" },
    ],
  }
];

const prettyDate = (iso: string): string => {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})
};

type Transaction = {
  id: string;
  amount: number;
  description: string;
  tag: string;
};

type Section = {
  date: string;
  data: Transaction[];
};

const sectionTotal = (section: Section) =>
  section.data.reduce((sum: number, t: Transaction) => sum + (t.amount || 0), 0);

const Tag = ({ value }: { value: string }) => {
  const style = TAG_STYLES[value as keyof typeof TAG_STYLES] || {bg: '#E5E7EB', text: '#111827'};
  return (
    <View style={[styles.tag, { backgroundColor: style.bg }]}>
      <Text style={[styles.tagText, { color: style.text }]}>{value}</Text>
    </View>
  );
};

const TransactionRow = ({ item }: { item: Transaction }) => (
  <View style={styles.row}>
    <View style={styles.rowText}>
      <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>
      <Tag value={item.tag} />
    </View>
    <Text style={styles.amount}>{CURRENCY.format(item.amount)}</Text>
  </View>
);

export default function TransactionsSectionList() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const sectionWithTotals = useMemo(
    () =>
      SECTIONS.map((s) => ({
        ...s,
        title: prettyDate(s.date),
        _total: sectionTotal(s)
      })),
    []
  );

  const backgroundColor = isDark ? '#000000' : '#ffffff';
  const headerBg = isDark ? '#111827' : '#f9fafb';

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: isDark ? '#000000' : '#ffffff' },
      ]}
    >
      <SectionList
        sections={sectionWithTotals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionRow item={item} />}
        renderSectionHeader={({ section }) => (
          <View
            style={[
              styles.sectionHeader,
              { backgroundColor: isDark ? '#111827' : '#f9fafb' },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: isDark ? '#f9fafb' : '#111827' }]}>
              {section.title}
            </Text>
            <Text style={[styles.sectionTotal, { color: isDark ? '#f9fafb' : '#374151' }]}>
              {CURRENCY.format(section._total)}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={[styles.itemSep, { backgroundColor: isDark ? '#27272a' : '#e5e7eb' }]} />
        )}
        SectionSeparatorComponent={() => (
          <View style={[styles.sectionSep, { backgroundColor: isDark ? '#1f2937' : '#f3f4f6' }]} />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={[styles.h1, { color: isDark ? '#f9fafb' : '#111827' }]}>Transactions</Text>
            <Text style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              Last 10 days
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: isDark ? '#d1d5db' : '#111827' }]}>
              {`Total (${sectionWithTotals.length} days): `}
              <Text style={styles.footerStrong}>
                {CURRENCY.format(
                  sectionWithTotals.reduce((sum, s) => sum + s._total, 0)
                )}
              </Text>
            </Text>
          </View>
        }
        style={{ backgroundColor }}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  listContent: {
    paddingBottom: 40,
  },
  listHeader: {
    paddingVertical: 16,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTotal: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  desc: {
    fontSize: 15,
    flexShrink: 1,
  },
  amount: {
    fontSize: 15,
    fontWeight: '500',
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemSep: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  sectionSep: {
    height: 6,
    backgroundColor: '#f3f4f6',
  },
  footer: {
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
  },
  footerStrong: {
    fontWeight: '700',
  }});