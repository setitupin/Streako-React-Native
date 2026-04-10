import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/dashboard/Header';
import { StreakCard } from '../components/dashboard/StreakCard';
import { StatsRow } from '../components/dashboard/StatsRow';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { TasksList } from '../components/dashboard/TasksList';
import { QuoteCard } from '../components/dashboard/QuoteCard';
import { FloatingActionButton } from '../components/dashboard/FloatingActionButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/useAuthStore';

export const DashboardScreen = () => {
  const insets = useSafeAreaInsets();
  const username = useAuthStore((state) => state.username);
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingHeader}>
          <Text style={styles.greetingText}>Hello, {username || 'Safwan'}</Text>
          <Text style={styles.greetingTitle}>Ready for takeoff?</Text>
        </View>

        <StreakCard />
        <StatsRow />
        <ActivityChart />
        <TasksList />
        <QuoteCard />
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
    paddingBottom: 100, // Space for BottomTabs + FAB padding
  },
  greetingHeader: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
  },
  greetingText: {
    color: '#8A96A8',
    fontSize: 16,
    marginBottom: 4,
  },
  greetingTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
