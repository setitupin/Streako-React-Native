import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';

export const StreakCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Flame color="#00F0FF" size={14} fill="#00F0FF" />
          <Text style={styles.title}>Active Streak</Text>
        </View>
        <Text style={styles.dayText}>Day 5</Text>
      </View>
      
      <View style={styles.valueRow}>
        <Text style={styles.valueLarge}>5</Text>
        <Text style={styles.valueSmall}>days</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '65%' }]} />
        </View>
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#00F0FF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  dayText: {
    color: '#8A96A8',
    fontSize: 12,
    fontWeight: '500',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  valueLarge: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  valueSmall: {
    color: '#8A96A8',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
    marginBottom: 6,
  },
  progressContainer: {
    paddingVertical: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#1C253B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A99AFE',
    borderRadius: 3,
  },
});
