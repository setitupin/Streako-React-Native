import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/dashboard/Header';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { DateScroller } from '../components/calendar/DateScroller';
import { TimelineEvent } from '../components/calendar/TimelineEvent';
import { TimelineNow } from '../components/calendar/TimelineNow';
import { FloatingActionButton } from '../components/dashboard/FloatingActionButton';
import { Video, ListChecks, Wine } from 'lucide-react-native';
import { StateCard } from '../components/common/StateCard';
import { useEventsQuery } from '../api/queries/events';
import { formatTime, getEventAccent, toLocalDateKey } from '../utils/formatters';
import type { EventKind } from '../api/types';

export const CalendarScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const activeDateKey = toLocalDateKey(activeDate);
  const eventsQuery = useEventsQuery({
    date_from: activeDateKey,
    date_to: activeDateKey,
  });

  const getEventIcon = (kind: EventKind) => {
    if (kind === 'meeting') {
      return Video;
    }

    if (kind === 'task') {
      return ListChecks;
    }

    return Wine;
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CalendarHeader currentDate={activeDate} />
        <DateScroller activeDate={activeDate} onDateSelect={setActiveDate} />

        <View style={styles.flowHeader}>
          <Text style={styles.flowTitle}>Daily Flow</Text>
          <View style={styles.headerLine} />
        </View>

        {eventsQuery.isLoading ? (
          <StateCard title="Loading events" message={`Fetching calendar data for ${activeDateKey}.`} loading />
        ) : null}

        {eventsQuery.error ? (
          <StateCard
            title="Calendar unavailable"
            message={eventsQuery.error instanceof Error ? eventsQuery.error.message : 'Unable to load events.'}
            tone="error"
          />
        ) : null}

        {toLocalDateKey(new Date()) === activeDateKey && (eventsQuery.data || []).length > 0 ? (
          <TimelineNow />
        ) : null}

        {(eventsQuery.data || [])
          .slice()
          .sort((left, right) => left.start_time.localeCompare(right.start_time))
          .map((event, index, items) => {
            const accent = getEventAccent(event.kind);
            const Icon = getEventIcon(event.kind);

            return (
              <TimelineEvent
                key={event.id}
                time={formatTime(event.start_time)}
                accent={accent}
                category={event.kind.toUpperCase()}
                title={event.title}
                description={event.description || 'No description provided.'}
                Icon={Icon}
                isLast={index === items.length - 1}
              />
            );
          })}

        {!eventsQuery.isLoading && (eventsQuery.data || []).length === 0 ? (
          <StateCard message={`No events were found for ${activeDateKey}.`} />
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
  flowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  flowTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1E253B',
  },
});
