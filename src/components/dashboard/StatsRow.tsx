import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';

interface StatsRowProps {
  completedToday: number;
  totalToday: number;
  weeklyScore: number;
}

export const StatsRow: React.FC<StatsRowProps> = ({
  completedToday,
  totalToday,
  weeklyScore,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Weekly Score</Text>
        <View style={styles.valueRow}>
          <Text style={styles.valueAccent}>{Math.round(weeklyScore)}%</Text>
          <TrendingUp color="#00F0FF" size={18} style={styles.icon} />
        </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.label}>Tasks Today</Text>
        <View style={styles.valueRow}>
          <Text style={styles.valuePrimary}>{completedToday}</Text>
          <Text style={styles.valueSuffix}>/{totalToday}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#131926',
    borderRadius: 24,
    padding: 20,
  },
  label: {
    color: '#8A96A8',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valueAccent: {
    color: '#A99AFE',
    fontSize: 28,
    fontWeight: 'bold',
  },
  valuePrimary: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  valueSuffix: {
    color: '#8A96A8',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  icon: {
    marginLeft: 8,
  },
});
