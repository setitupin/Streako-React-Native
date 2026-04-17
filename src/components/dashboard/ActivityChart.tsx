import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ActivityChartItem {
  active: boolean;
  day: string;
  height: string;
}

interface ActivityChartProps {
  data: ActivityChartItem[];
  trendLabel: string;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ data, trendLabel }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Activity</Text>
          <Text style={styles.subtitle}>Task completion velocity</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{trendLabel}</Text>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.barColumn}>
            <View style={styles.barTrack}>
              <View 
                style={[
                  styles.barFill, 
                  { height: item.height as any },
                  item.active && styles.barFillActive
                ]} 
              />
            </View>
            <Text style={[styles.dayLabel, item.active && styles.dayLabelActive]}>
              {item.day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#131926',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#8A96A8',
    fontSize: 12,
  },
  pill: {
    backgroundColor: '#1C253B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillText: {
    color: '#A99AFE',
    fontSize: 11,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  barColumn: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    height: '100%',
    width: 28,
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#1C253B',
    borderRadius: 6,
  },
  barFillActive: {
    backgroundColor: '#A99AFE',
  },
  dayLabel: {
    color: '#8A96A8',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 12,
  },
  dayLabelActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
