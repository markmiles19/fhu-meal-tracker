import React, { useMemo } from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';

const CURRENCY = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
});

const TAG_STYLES = {
  Starbucks: { bg: '#F3E8FF', text: '#6B21A8' },
  LP:        { bg: '#E0F2FE', text: '#075985' },
  CFA:       { bg: '#FEF3C7', text: '#92400E' },
  Jones:     { bg: '#DCFCE7', text: '#166534' },
};

const SECTIONS = [
  {
    date: '2025-09-29',
    data: [
      { id: '0929-1', amount: 6.45, description: 'Iced latte', tag: 'Starbucks'},
      { id: '0929-2', amount: 12.00, description: 'Chicken Sandwich Combo', tag: 'CFA'}
    ]
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
  const sectionWithTotals = useMemo(
    () =>
      SECTIONS.map((s) => ({
        ...s,
        title: prettyDate(s.date),
        _total: sectionTotal(s)
      })),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      <SectionList
        sections={sectionWithTotals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionRow item={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionTotal}>{CURRENCY.format(section._total)}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSep} />}
        SectionSeparatorComponent={() => <View style={styles.sectionSep} />}
        stickySectionHeadersEnabled
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.h1}>Transactions</Text>
            <Text style={styles.subtitle}>Last 10 days</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {`Total (${sectionWithTotals.length} days): `}
              <Text style={styles.footerStrong}>
                {CURRENCY.format(
                  sectionWithTotals.reduce((sum, s) => sum + s._total, 0)
                )}
              </Text>
            </Text>
          </View>
        }
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