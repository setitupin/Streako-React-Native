export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  dashboard: {
    health: ['dashboard', 'health'] as const,
    summary: ['dashboard', 'summary'] as const,
  },
  tasks: {
    all: ['tasks'] as const,
    list: (filters?: Record<string, unknown>) => ['tasks', 'list', filters ?? {}] as const,
    categories: ['tasks', 'categories'] as const,
  },
  habits: {
    all: ['habits'] as const,
    list: (filters?: Record<string, unknown>) => ['habits', 'list', filters ?? {}] as const,
  },
  events: {
    all: ['events'] as const,
    list: (filters?: Record<string, unknown>) => ['events', 'list', filters ?? {}] as const,
  },
  streaks: {
    all: ['streaks'] as const,
    list: (filters?: Record<string, unknown>) => ['streaks', 'list', filters ?? {}] as const,
  },
};
