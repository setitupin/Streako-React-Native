import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HabitOverview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <Text style={styles.label}>CONSISTENCY SCORE</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLarge}>98</Text>
          <Text style={styles.scoreSmall}>%</Text>
        </View>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.label}>WEEKLY STREAK</Text>
        <Text style={styles.streakAccent}>24 Days</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  leftCol: {
    flex: 1,
  },
  label: {
    color: '#8A96A8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 2,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreLarge: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
  },
  scoreSmall: {
    color: '#A99AFE',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 8,
  },
  streakAccent: {
    color: '#A99AFE',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
