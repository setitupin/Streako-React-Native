import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

interface MilestoneCardProps {
  footerText: string;
  progressRatio: number;
  title: string;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  footerText,
  progressRatio,
  title,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Star color="#A99AFE" size={10} fill="#A99AFE" />
        </View>
        <Text style={styles.label}>NEXT MILESTONE</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.min(progressRatio * 100, 100)}%` }]} />
      </View>
      
      <Text style={styles.footerText}>{footerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1B38', // Solid color simulating the gradient
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#13112A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
    color: '#A99AFE',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 24,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#13112A',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A99AFE',
    borderRadius: 2,
  },
  footerText: {
    color: '#8A96A8',
    fontSize: 12,
  },
});
