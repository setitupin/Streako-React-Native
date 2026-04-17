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
import {
  ArrowLeft,
  Rocket,
  Calendar,
  Clock,
  User,
  Settings,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CreateTaskScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [isRecurring, setIsRecurring] = useState(false);

  const categories = ['Business', 'Personal', 'Urgent'];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.container, { paddingTop: insets.top || 20 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft color="#FFFFFF" size={24} />
            <Text style={styles.headerTitle}>Streako</Text>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <User color="#A99AFE" size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconCircle, { backgroundColor: 'transparent' }]}>
              <Settings color="#8A96A8" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 40 },
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>New Task</Text>
            <Text style={styles.subtitleText}>
              Fuel your momentum. Set a new objective for your streak.
            </Text>
          </View>

          {/* Task Title */}
          <View style={styles.section}>
            <Text style={styles.label}>TASK TITLE</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="What's the next win?"
                placeholderTextColor="#4B5563"
                value={title}
                onChangeText={setTitle}
                selectionColor="#A99AFE"
              />
              <Rocket color="#64748B" size={20} style={styles.inputIcon} />
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.label}>DESCRIPTION</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Break it down into actionable steps..."
              placeholderTextColor="#4B5563"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              selectionColor="#A99AFE"
            />
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.label}>CATEGORIES</Text>
            <View style={styles.categoriesRow}>
              {categories.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                    onPress={() => toggleCategory(cat)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isActive && styles.categoryTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Due Date */}
          <View style={styles.section}>
            <Text style={styles.label}>DUE DATE</Text>
            <TouchableOpacity style={styles.pickerContainer} activeOpacity={0.8}>
              <View style={styles.pickerLeft}>
                <Calendar color="#A99AFE" size={20} />
                <Text style={styles.pickerText}>mm/dd/yyyy</Text>
              </View>
              <Calendar color="#334155" size={16} />
            </TouchableOpacity>
          </View>

          {/* Scheduled At */}
          <View style={styles.section}>
            <Text style={styles.label}>SCHEDULED AT</Text>
            <TouchableOpacity style={styles.pickerContainer} activeOpacity={0.8}>
              <View style={styles.pickerLeft}>
                <Clock color="#38BDF8" size={20} />
                <Text style={styles.pickerText}>--:-- --</Text>
              </View>
              <Clock color="#334155" size={16} />
            </TouchableOpacity>
          </View>

          {/* Priority Level */}
          <View style={styles.section}>
            <Text style={styles.label}>PRIORITY LEVEL</Text>
            <View style={styles.priorityContainer}>
              {(['Low', 'Medium', 'High'] as const).map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.priorityButton,
                    priority === level && styles.priorityButtonActive,
                  ]}
                  onPress={() => setPriority(level)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      priority === level && styles.priorityTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recurring */}
          <View style={styles.recurringContainer}>
            <View>
              <Text style={styles.recurringTitle}>Recurring</Text>
              <Text style={styles.recurringSub}>Daily Momentum</Text>
            </View>
            <Switch
              value={isRecurring}
              onValueChange={setIsRecurring}
              trackColor={{ false: '#1E2540', true: '#A99AFE' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#1E2540"
            />
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Create Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Text style={styles.secondaryButtonText}>Discard</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#A99AFE',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 12,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E2540',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitleText: {
    color: '#8A96A8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    color: '#B3C8E9',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#131926',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#FFFFFF',
    fontSize: 15,
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryPill: {
    backgroundColor: '#131926',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryPillActive: {
    backgroundColor: '#2A3655', // Or some darker active state
  },
  categoryText: {
    color: '#8A96A8',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  pickerContainer: {
    backgroundColor: '#111520',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
  },
  priorityContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000', // very dark background for container
    borderRadius: 12,
    padding: 4,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  priorityButtonActive: {
    backgroundColor: '#1E2540',
  },
  priorityText: {
    color: '#8A96A8',
    fontWeight: '600',
    fontSize: 14,
  },
  priorityTextActive: {
    color: '#FFFFFF',
  },
  recurringContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0D111A',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  recurringTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  recurringSub: {
    color: '#8A96A8',
    fontSize: 12,
  },
  actionsContainer: {
    gap: 12,
  },
  primaryButton: {
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
  primaryButtonText: {
    color: '#131926',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#131926',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#8A96A8',
    fontSize: 16,
    fontWeight: '600',
  },
});
