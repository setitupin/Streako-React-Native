import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/dashboard/Header';
import { TaskSearchBar } from '../components/tasks/TaskSearchBar';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskCard } from '../components/tasks/TaskCard';
import { FloatingActionButton } from '../components/dashboard/FloatingActionButton';
import { StateCard } from '../components/common/StateCard';
import { useTaskCategoriesQuery, useTasksQuery } from '../api/queries/tasks';
import { formatShortDate, getCategoryMeta, mapPriorityLabel } from '../utils/formatters';

export const TasksScreen = () => {
  const insets = useSafeAreaInsets();
  const tasksQuery = useTasksQuery({
    ordering: 'due_date',
    status: 'pending',
  });
  const categoriesQuery = useTaskCategoriesQuery();
  const categories = categoriesQuery.data || [];
  const error = tasksQuery.error || categoriesQuery.error;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TaskSearchBar />
        <TaskFilters />

        {tasksQuery.isLoading ? (
          <StateCard title="Loading tasks" message="Fetching pending tasks from `/api/tasks/`." loading />
        ) : null}

        {error ? (
          <StateCard
            title="Tasks unavailable"
            message={error instanceof Error ? error.message : 'Unable to load tasks.'}
            tone="error"
          />
        ) : null}

        {(tasksQuery.data || []).map((task) => {
          const categoryMeta = getCategoryMeta(task.category, categories);

          return (
            <TaskCard
              key={task.id}
              title={task.title}
              category={categoryMeta.name}
              categoryColor={categoryMeta.color}
              priority={mapPriorityLabel(task.priority)}
              date={formatShortDate(task.due_date)}
              hasAccent={task.priority === 'high'}
              accentColor={task.priority === 'high' ? '#00F0FF' : '#A99AFE'}
            />
          );
        })}

        {!tasksQuery.isLoading && (tasksQuery.data || []).length === 0 ? (
          <StateCard message="No pending tasks were found for this account." />
        ) : null}
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
