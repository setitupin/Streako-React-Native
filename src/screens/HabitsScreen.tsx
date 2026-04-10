import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/dashboard/Header';
import { HabitOverview } from '../components/habits/HabitOverview';
import { ActivityHeatmap } from '../components/habits/ActivityHeatmap';
import { HabitMetricsRow } from '../components/habits/HabitMetricsRow';
import { HabitRitualCard } from '../components/habits/HabitRitualCard';
import { MilestoneCard } from '../components/habits/MilestoneCard';
import { Dumbbell, Flower2, BookOpen } from 'lucide-react-native';

export const HabitsScreen = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HabitOverview />
        <ActivityHeatmap />
        <HabitMetricsRow />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Rituals</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <HabitRitualCard 
          title="Morning Gym"
          current={14}
          best={42}
          Icon={Dumbbell}
          accentColor="#00F0FF"
          isCompleted={true}
        />

        <HabitRitualCard 
          title="Mindfulness"
          current={8}
          best={15}
          Icon={Flower2}
          accentColor="#A99AFE"
          isCompleted={false}
        />

        <HabitRitualCard 
          title="Daily Reading"
          current={31}
          best={60}
          Icon={BookOpen}
          accentColor="#FFFFFF"
          isCompleted={false}
        />

        <MilestoneCard />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A0F',
  },
  scrollContent: {
    paddingBottom: 80,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#A99AFE',
    fontSize: 12,
    fontWeight: '600',
  },
});
