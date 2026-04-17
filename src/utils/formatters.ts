import type { AuthUser, DailySummary, EventKind, Habit, Streak, TaskCategory, TaskPriority } from '../api/types';

export const toLocalDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getDisplayName = (user: AuthUser | null) => {
  if (!user) {
    return 'there';
  }

  const fullName = `${user.first_name} ${user.last_name}`.trim();
  return fullName || user.email;
};

export const formatShortDate = (value: string | null) => {
  if (!value) {
    return 'No due date';
  }

  const date = new Date(value);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (sameDay) {
    return 'Today';
  }

  const sameTomorrow =
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate();

  if (sameTomorrow) {
    return 'Tomorrow';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatTime = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));

export const formatPercent = (value: number) => `${Math.round(value)}%`;

export const mapPriorityLabel = (priority: TaskPriority): 'High' | 'Medium' | 'Low' => {
  if (priority === 'high') {
    return 'High';
  }

  if (priority === 'low') {
    return 'Low';
  }

  return 'Medium';
};

export const getCategoryMeta = (
  categoryId: number | null,
  categories: TaskCategory[],
) => {
  const category = categories.find((item) => item.id === categoryId);

  return {
    color: category?.color || '#A99AFE',
    name: (category?.name || 'General').toUpperCase(),
  };
};

export const buildChartData = (summaries: DailySummary[]) => {
  const recent = summaries.slice(-7);
  const peak = Math.max(...recent.map((item) => item.productivity_score), 100);

  return recent.map((item, index) => ({
    day: new Intl.DateTimeFormat('en-US', { weekday: 'narrow' }).format(new Date(item.date)),
    height: `${Math.max((item.productivity_score / peak) * 100, 12)}%`,
    active: index === recent.length - 1,
  }));
};

export const getHabitCompletionRate = (habits: Habit[], targetDate: string) => {
  if (!habits.length) {
    return 0;
  }

  const completedCount = habits.filter((habit) =>
    habit.logs.some((log) => log.date === targetDate),
  ).length;

  return Math.round((completedCount / habits.length) * 100);
};

export const getCompletedHabitCount = (habits: Habit[], targetDate: string) =>
  habits.filter((habit) => habit.logs.some((log) => log.date === targetDate)).length;

export const getTotalHabitLogs = (habits: Habit[]) =>
  habits.reduce((count, habit) => count + habit.logs.length, 0);

export const getMilestoneCopy = (habit: Habit | undefined, streak: Streak | undefined) => {
  if (!habit || !streak) {
    return {
      footerText: 'Complete a habit to unlock the next milestone.',
      progressRatio: 0,
      title: 'No streak milestone available yet.',
    };
  }

  const current = streak.current_streak;
  const target = Math.max(7, Math.ceil((current + 1) / 7) * 7);
  const remaining = Math.max(target - current, 0);

  return {
    footerText: `Current Progress: ${current}/${target} days`,
    progressRatio: target === 0 ? 0 : current / target,
    title: `Complete ${remaining} more day${remaining === 1 ? '' : 's'} of '${habit.name}' to reach the next ${target}-day milestone`,
  };
};

export const buildHabitHeatmap = (habits: Habit[]) => {
  const today = new Date();
  const values = Array.from({ length: 14 }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (13 - index));
    const key = toLocalDateKey(day);
    const completions = habits.filter((habit) =>
      habit.logs.some((log) => log.date === key),
    ).length;

    if (completions === 0) {
      return '#1C253B';
    }

    if (completions === 1) {
      return '#25304A';
    }

    return completions >= 3 ? '#A99AFE' : '#7C69EE';
  });

  return [values.slice(0, 7), values.slice(7)];
};

export const getEventAccent = (kind: EventKind) => {
  if (kind === 'meeting') {
    return '#00F0FF';
  }

  if (kind === 'task') {
    return '#A99AFE';
  }

  return '#8A96A8';
};
