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
import { StateCard } from '../components/common/StateCard';
import { useHabitsQuery } from '../api/queries/habits';
import { useStreaksQuery } from '../api/queries/streaks';
import type { Streak } from '../api/types';
import {
  buildHabitHeatmap,
  getCompletedHabitCount,
  getHabitCompletionRate,
  getMilestoneCopy,
  getTotalHabitLogs,
  toLocalDateKey,
} from '../utils/formatters';

export const HabitsScreen = () => {
  const insets = useSafeAreaInsets();
  const habitsQuery = useHabitsQuery({ is_active: true });
  const streaksQuery = useStreaksQuery({ entity_type: 'habit' });
  const habits = habitsQuery.data || [];
  const streaks = streaksQuery.data || [];
  const todayKey = toLocalDateKey(new Date());
  const completionRate = getHabitCompletionRate(habits, todayKey);
  const completedToday = getCompletedHabitCount(habits, todayKey);
  const totalLogs = getTotalHabitLogs(habits);
  const topHabitStreak = streaks.reduce<Streak | undefined>(
    (best, streak) =>
      !best || streak.current_streak > best.current_streak ? streak : best,
    undefined,
  );
  const milestoneHabit = habits.find((habit) => habit.id === topHabitStreak?.entity_id);
  const milestone = getMilestoneCopy(milestoneHabit, topHabitStreak);
  const icons = [Dumbbell, Flower2, BookOpen];
  const error = habitsQuery.error || streaksQuery.error;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {habitsQuery.isLoading ? (
          <StateCard title="Loading habits" message="Fetching active habits and streaks from the localhost API." loading />
        ) : null}

        {error ? (
          <StateCard
            title="Habits unavailable"
            message={error instanceof Error ? error.message : 'Unable to load habits.'}
            tone="error"
          />
        ) : null}

        <HabitOverview
          consistencyScore={completionRate}
          streakLabel={`${topHabitStreak?.current_streak || 0} Days`}
        />
        <ActivityHeatmap heatData={buildHabitHeatmap(habits)} />
        <HabitMetricsRow
          powerSessions={totalLogs}
          dailyVelocity={`${completionRate}%`}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Rituals</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {habits.slice(0, 3).map((habit, index) => {
          const streak = streaks.find((item) => item.entity_id === habit.id);
          const Icon = icons[index % icons.length];

          return (
            <HabitRitualCard
              key={habit.id}
              title={habit.name}
              current={streak?.current_streak || 0}
              best={streak?.longest_streak || 0}
              Icon={Icon}
              accentColor={index === 0 ? '#00F0FF' : index === 1 ? '#A99AFE' : '#FFFFFF'}
              isCompleted={habit.logs.some((log) => log.date === todayKey)}
            />
          );
        })}

        {!habitsQuery.isLoading && habits.length === 0 ? (
          <StateCard message="No active habits were returned by `/api/habits/`." />
        ) : null}

        <MilestoneCard
          title={milestone.title}
          progressRatio={milestone.progressRatio}
          footerText={milestone.footerText}
        />

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
