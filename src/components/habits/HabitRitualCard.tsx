import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

export interface HabitRitualCardProps {
  title: string;
  current: number;
  best: number;
  Icon: any;
  accentColor: string;
  isCompleted: boolean;
}

export const HabitRitualCard: React.FC<HabitRitualCardProps> = ({
  title,
  current,
  best,
  Icon,
  accentColor,
  isCompleted,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        <View style={styles.iconContainer}>
          <View style={[styles.iconAccent, { backgroundColor: accentColor }]} />
          <Icon color={accentColor} size={20} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.metricsRow}>
            <Text style={styles.metricLabel}>CURRENT: <Text style={styles.metricValue}>{current}</Text></Text>
            <Text style={styles.metricDot}> • </Text>
            <Text style={styles.metricLabel}>BEST: <Text style={styles.metricValue}>{best}</Text></Text>
          </View>
        </View>

        {isCompleted ? (
          <View style={[styles.circle, styles.circleCompleted]}>
            <Check color="#131926" size={16} strokeWidth={3} />
          </View>
        ) : (
          <View style={styles.circle} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#131926',
    borderRadius: 24,
    marginBottom: 12,
    marginHorizontal: 20,
    padding: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1F2739',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  iconAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricsRow: {
    flexDirection: 'row',
  },
  metricLabel: {
    color: '#8A96A8',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  metricValue: {
    color: '#A99AFE',
  },
  metricDot: {
    color: '#8A96A8',
    fontSize: 10,
    marginHorizontal: 4,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2A344A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCompleted: {
    backgroundColor: '#A99AFE',
    borderColor: '#A99AFE',
  },
});
