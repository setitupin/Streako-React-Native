export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  timezone: string;
  is_premium: boolean;
  date_joined: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  timezone?: string;
}

export interface LoginResponse {
  token: string;
  user_id: number;
}

export interface RegisterResponse {
  token: string;
  user: AuthUser;
}

export interface TaskCategory {
  id: number;
  name: string;
  color?: string | null;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed' | 'missed';

export interface TaskLog {
  id: number;
  date: string;
  status: TaskStatus;
  completed_at: string | null;
}

export interface Task {
  id: number;
  category: number | null;
  tags: number[];
  title: string;
  description: string;
  scheduled_at: string | null;
  due_date: string | null;
  completed_at: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  attachment: string | null;
  is_recurring: boolean;
  recurrence_rule: string;
  moved_to_history_at: string | null;
  created_at: string;
  updated_at: string;
  logs: TaskLog[];
}

export type HabitFrequency = 'daily' | 'weekly';

export interface HabitLog {
  id: number;
  date: string;
  status: 'completed';
}

export interface Habit {
  id: number;
  name: string;
  frequency: HabitFrequency;
  start_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  logs: HabitLog[];
}

export type EventKind = 'meeting' | 'task' | 'event';

export interface Event {
  id: number;
  title: string;
  description: string;
  kind: EventKind;
  start_time: string;
  end_time: string;
  repeat_option: 'none' | 'daily' | 'weekly' | 'custom';
  recurrence_rule: string;
  is_recurring: boolean;
  created_at?: string;
  updated_at?: string;
}

export type StreakEntityType = 'task' | 'habit';

export interface Streak {
  id: number;
  entity_type: StreakEntityType;
  entity_id: number;
  current_streak: number;
  longest_streak: number;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface DailySummary {
  id: number;
  date: string;
  tasks_completed: number;
  tasks_missed: number;
  pending_tasks: number;
  active_streaks: number;
  productivity_score: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardSummary {
  today: DailySummary | null;
  pending_tasks: number;
  completed_tasks_today: number;
  active_streaks: number;
  weekly_productivity_score: number;
  recent_summaries: DailySummary[];
}

export interface HealthCheckResponse {
  status: string;
  message: string;
}
