import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame, Zap } from 'lucide-react-native';

export const HabitMetricsRow = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Flame color="#00F0FF" size={20} fill="#00F0FF" />
        <Text style={styles.label}>Power Sessions</Text>
        <Text style={styles.value}>128</Text>
      </View>
      <View style={styles.card}>
        <Zap color="#A99AFE" size={20} fill="#A99AFE" />
        <Text style={styles.label}>Daily Velocity</Text>
        <Text style={styles.value}>+12%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
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
    marginTop: 12,
    marginBottom: 4,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
