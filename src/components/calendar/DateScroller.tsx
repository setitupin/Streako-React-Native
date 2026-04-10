import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DateScrollerProps {
  activeDate: Date;
  onDateSelect: (date: Date) => void;
}

export const DateScroller: React.FC<DateScrollerProps> = ({ activeDate, onDateSelect }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Generate 15 Days surrounding "Today"
  const today = new Date();
  const datesArray = Array.from({ length: 15 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - 5 + i);
    return d;
  });

  const isSameDate = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  useEffect(() => {
    // Basic trick to center the scrollview slightly on load
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: 120, animated: true });
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {datesArray.map((date, index) => {
          const isActive = isSameDate(date, activeDate);
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date).toUpperCase();
          const dayNum = date.getDate();

          return (
            <TouchableOpacity 
              key={index} 
              activeOpacity={0.8}
              onPress={() => onDateSelect(date)}
              style={[styles.dateCard, isActive && styles.dateCardActive]}
            >
              <Text style={[styles.dayName, isActive && styles.dayNameActive]}>
                {dayName}
              </Text>
              <Text style={[styles.dayNum, isActive && styles.dayNumActive]}>
                {dayNum}
              </Text>
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  dateCard: {
    width: 65,
    height: 90,
    backgroundColor: '#131926',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCardActive: {
    backgroundColor: '#A99AFE',
    transform: [{ scale: 1.05 }],
  },
  dayName: {
    color: '#8A96A8',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dayNameActive: {
    color: '#342971', 
  },
  dayNum: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  dayNumActive: {
    color: '#1E1B38',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1E1B38',
    marginTop: 6,
  },
});
