import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ArrowLeft, Zap, Calendar, Star, Bell } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CreateHabitScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [habitName, setHabitName] = useState('');
  const [rhythm, setRhythm] = useState<'Daily' | 'Weekly'>('Daily');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.container, { paddingTop: insets.top || 20 }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft color="#B3C8E9" size={20} />
            <Text style={styles.backText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 40 },
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Build a New</Text>
            <Text style={[styles.titleText, styles.titleHighight]}>
              Momentum
            </Text>
            <Text style={styles.subtitleText}>
              Craft a habit that sticks. Define the name, set the rhythm, and start your streak.
            </Text>
          </View>

          {/* Identity Section */}
          <View style={styles.section}>
            <View style={styles.sectionIndicator} />
            <View style={styles.sectionContent}>
              <Text style={styles.sectionLabel}>IDENTITY</Text>
              <Text style={styles.inputLabel}>Habit Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Deep Focus Reading"
                placeholderTextColor="#4B5563"
                value={habitName}
                onChangeText={setHabitName}
                selectionColor="#A99AFE"
              />
            </View>
          </View>

          {/* Rhythm Section */}
          <View style={styles.section}>
            <View style={[styles.sectionIndicator, { backgroundColor: '#A99AFE' }]} />
            <View style={styles.sectionContent}>
              <Text style={styles.sectionLabel}>RHYTHM</Text>
              <Text style={styles.inputLabel}>Frequency</Text>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    rhythm === 'Daily' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setRhythm('Daily')}
                  activeOpacity={0.8}
                >
                  <Zap
                    color={rhythm === 'Daily' ? '#FFFFFF' : '#8A96A8'}
                    size={16}
                    strokeWidth={2.5}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={[
                      styles.toggleText,
                      rhythm === 'Daily' && styles.toggleTextActive,
                    ]}
                  >
                    Daily
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    rhythm === 'Weekly' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setRhythm('Weekly')}
                  activeOpacity={0.8}
                >
                  <Calendar
                    color={rhythm === 'Weekly' ? '#FFFFFF' : '#8A96A8'}
                    size={16}
                    strokeWidth={2.5}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={[
                      styles.toggleText,
                      rhythm === 'Weekly' && styles.toggleTextActive,
                    ]}
                  >
                    Weekly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Target Goal Section */}
          <View style={[styles.section, { paddingVertical: 16 }]}>
            <View style={styles.sectionContentNoIndicator}>
              <View style={styles.rowCentered}>
                <View style={styles.iconCircle}>
                  <Star color="#131926" size={14} fill="#131926" strokeWidth={0} />
                </View>
                <Text style={styles.inputLabel}>Target Goal</Text>
              </View>
              <View style={styles.rowAligned}>
                <Text style={styles.goalValue}>30</Text>
                <Text style={styles.goalText}>Days Sprint</Text>
              </View>
            </View>
          </View>

          {/* Reminder Section */}
          <View style={[styles.section, { paddingVertical: 20 }]}>
            <View style={styles.sectionContentNoIndicator}>
              <View style={styles.rowCentered}>
                <Bell color="#A99AFE" size={18} />
                <Text style={[styles.inputLabel, { marginLeft: 8 }]}>Reminder</Text>
              </View>
              <View style={styles.rowBetween}>
                <Text style={styles.timeText}>08:00 AM</Text>
                <Switch
                  value={reminderEnabled}
                  onValueChange={setReminderEnabled}
                  trackColor={{ false: '#1E2540', true: '#A99AFE' }}
                  thumbColor={'#FFFFFF'}
                  ios_backgroundColor="#1E2540"
                />
              </View>
            </View>
          </View>

          {/* Create Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.createButton} activeOpacity={0.8}>
              <Text style={styles.createButtonText}>Create Habit</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.quoteText}>
            "Success is the sum of small efforts, repeated day in and day out."
          </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A0F',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#B3C8E9',
    fontSize: 16,
    marginLeft: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 32,
    marginTop: 8,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 40,
  },
  titleHighight: {
    color: '#A99AFE',
  },
  subtitleText: {
    color: '#8A96A8',
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#111520',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  sectionIndicator: {
    width: 4,
    backgroundColor: '#38BDF8',
  },
  sectionContent: {
    padding: 20,
    flex: 1,
  },
  sectionContentNoIndicator: {
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionLabel: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1C2438',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C2438',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#2A3655',
  },
  toggleText: {
    color: '#8A96A8',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    backgroundColor: '#A99AFE',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  goalValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginRight: 8,
  },
  goalText: {
    fontSize: 14,
    color: '#8A96A8',
  },
  timeText: {
    fontSize: 15,
    color: '#8A96A8',
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#A99AFE',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A99AFE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  createButtonText: {
    color: '#131926',
    fontSize: 16,
    fontWeight: '700',
  },
  quoteText: {
    color: '#8A96A8',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});
