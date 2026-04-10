import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/dashboard/Header';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { DateScroller } from '../components/calendar/DateScroller';
import { TimelineEvent } from '../components/calendar/TimelineEvent';
import { TimelineNow } from '../components/calendar/TimelineNow';
import { FloatingActionButton } from '../components/dashboard/FloatingActionButton';
import { Video, ListChecks, Wine, AlertCircle } from 'lucide-react-native'; // Standard glass missing, Wine used as proxy

export const CalendarScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  
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
          <Text style={styles.flowTitle}>Today's Flow</Text>
          <View style={styles.headerLine} />
        </View>

        {/* Timeline Events Array */}
        <TimelineEvent 
          time="09:00"
          accent="#00F0FF"
          category="MEETING"
          title="Product Sync: Q4 Vision"
          description="Strategy alignment with the design leads regarding kinetic motion systems."
          hasAvatars={true}
          Icon={Video}
        />

        <TimelineEvent 
          time="11:30"
          accent="#F43F5E"
          category="DEADLINE"
          title="Final Asset Handoff"
          description="Submit high-fidelity prototypes and kinetic Sanctuary components to dev team."
          Icon={AlertCircle}
        />

        <TimelineNow />

        <TimelineEvent 
          time="14:00"
          accent="#A99AFE"
          category="TASK"
          title="Deep Work: Animation Specs"
          description="Defining the cubic-bezier curves for the Sanctuary navigation transitions."
          Icon={ListChecks}
        />

        <TimelineEvent 
          time="17:30"
          accent="#8A96A8"
          category="EVENT"
          title="Community Mixer"
          description="Designers & coffee at the rooftop lounge."
          Icon={Wine}
          isLast={true}
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
