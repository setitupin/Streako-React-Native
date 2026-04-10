import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface CalendarHeaderProps {
  currentDate: Date;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate }) => {
  const monthString = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>SCHEDULE</Text>
        <Text style={styles.monthTitle}>{monthString}</Text>
      </View>
      <View style={styles.arrowsRow}>
        <TouchableOpacity style={styles.arrowButton}>
          <ChevronLeft color="#8A96A8" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowButton}>
          <ChevronRight color="#8A96A8" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    color: '#8A96A8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  monthTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  arrowsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#131926',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
