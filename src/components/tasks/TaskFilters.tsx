import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const filters = ['All Tasks', 'Work', 'Personal', 'Business'];

export const TaskFilters = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter, index) => {
          const isActive = index === 0;
          return (
            <TouchableOpacity 
              key={filter} 
              style={[styles.pill, isActive && styles.pillActive]}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {filter}
              </Text>
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
  pill: {
    backgroundColor: '#131926',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  pillActive: {
    backgroundColor: '#A99AFE',
  },
  pillText: {
    color: '#8A96A8',
    fontSize: 14,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#090D14',
  },
});
