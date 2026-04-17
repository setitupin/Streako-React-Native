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
import { StateCard } from '../components/common/StateCard';
import { useDashboardSummaryQuery } from '../api/queries/dashboard';
import { useTaskCategoriesQuery, useTasksQuery } from '../api/queries/tasks';
import { useStreaksQuery } from '../api/queries/streaks';
import {
  buildChartData,
  formatShortDate,
  formatPercent,
  getCategoryMeta,
  getDisplayName,
  mapPriorityLabel,
} from '../utils/formatters';

export const DashboardScreen = () => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const summaryQuery = useDashboardSummaryQuery();
  const tasksQuery = useTasksQuery({
    ordering: 'due_date',
    status: 'pending',
  });
  const categoriesQuery = useTaskCategoriesQuery();
  const streaksQuery = useStreaksQuery();

  const summary = summaryQuery.data;
  const tasks = (tasksQuery.data || []).slice(0, 3);
  const categories = categoriesQuery.data || [];
  const streaks = streaksQuery.data || [];
  const topStreak = streaks.reduce(
    (best, streak) =>
      streak.current_streak > best.current_streak ? streak : best,
    { current_streak: 0, longest_streak: 0 },
  );
  const todaySummary = summary?.today;
  const totalToday =
    (todaySummary?.tasks_completed || 0) +
    (todaySummary?.tasks_missed || 0) +
    (todaySummary?.pending_tasks || 0);
  const chartData = buildChartData([
    ...(summary?.recent_summaries || []),
    ...(todaySummary ? [todaySummary] : []),
  ]);
  const nextTasks = tasks.map((task) => {
    const categoryMeta = getCategoryMeta(task.category, categories);

    return {
      id: task.id,
      subtitle: `${mapPriorityLabel(task.priority)} priority • ${formatShortDate(task.due_date)} • ${categoryMeta.name}`,
      title: task.title,
    };
  });
  const error =
    summaryQuery.error ||
    tasksQuery.error ||
    categoriesQuery.error ||
    streaksQuery.error;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingHeader}>
          <Text style={styles.greetingText}>Hello, {getDisplayName(user)}</Text>
          <Text style={styles.greetingTitle}>Ready for takeoff?</Text>
        </View>

        {summaryQuery.isLoading ? (
          <StateCard title="Syncing dashboard" message="Loading today’s summary from the localhost API." loading />
        ) : null}

        {error ? (
          <StateCard
            title="Dashboard unavailable"
            message={error instanceof Error ? error.message : 'Unable to load dashboard data.'}
            tone="error"
          />
        ) : null}

        <StreakCard
          currentDays={topStreak.current_streak}
          longestDays={topStreak.longest_streak}
        />
        <StatsRow
          completedToday={summary?.completed_tasks_today || 0}
          totalToday={totalToday}
          weeklyScore={summary?.weekly_productivity_score || 0}
        />
        <ActivityChart
          data={
            chartData.length
              ? chartData
              : [
                  { day: 'M', height: '18%', active: false },
                  { day: 'T', height: '26%', active: false },
                  { day: 'W', height: '34%', active: false },
                  { day: 'T', height: '42%', active: false },
                  { day: 'F', height: '54%', active: false },
                  { day: 'S', height: '70%', active: false },
                  { day: 'S', height: '82%', active: true },
                ]
          }
          trendLabel={formatPercent(summary?.weekly_productivity_score || 0)}
        />
        <TasksList items={nextTasks} />
        {!tasksQuery.isLoading && nextTasks.length === 0 ? (
          <StateCard message="No pending tasks were returned by `/api/tasks/`." />
        ) : null}
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
