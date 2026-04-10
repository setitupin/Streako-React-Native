import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/dashboard/Header';
import { TaskSearchBar } from '../components/tasks/TaskSearchBar';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskCard } from '../components/tasks/TaskCard';
import { FloatingActionButton } from '../components/dashboard/FloatingActionButton';

export const TasksScreen = () => {
  const insets = useSafeAreaInsets();
  
  // Dummy faces for high priority tasks
  const avatars = [
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80'
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TaskSearchBar />
        <TaskFilters />

        <TaskCard 
          title="Q3 Strategy Finalization"
          category="WORK"
          categoryColor="#A99AFE"
          priority="High"
          date="Oct 24, 2023"
          hasAccent={true}
          accentColor="#00F0FF"
          avatars={avatars}
        />

        <TaskCard 
          title="Weekly Grocery Run"
          category="PERSONAL"
          categoryColor="#00F0FF"
          priority="Medium"
          date="Today"
        />

        <TaskCard 
          title="Research New Monitor"
          category="BUSINESS"
          categoryColor="#A99AFE"
          priority="Low"
          date="Oct 30, 2023"
        />

        <TaskCard 
          title="Client Presentation"
          category="WORK"
          categoryColor="#A99AFE"
          priority="High"
          date="Tomorrow"
          hasAccent={true}
          accentColor="#00F0FF"
        />
        
      </ScrollView>

      <FloatingActionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A0F',
  },
  scrollContent: {
    paddingBottom: 100, // accommodate bottom tab and FAB
    paddingTop: 8,
  },
});
