import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, ListChecks, Flame, Calendar as CalendarIcon } from 'lucide-react-native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { HabitsScreen } from '../screens/HabitsScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabbarContainer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let IconComponent = LayoutDashboard;
        if (route.name === 'Tasks') IconComponent = ListChecks;
        if (route.name === 'Habits') IconComponent = Flame;
        if (route.name === 'Calendar') IconComponent = CalendarIcon;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItemWrapper}
            activeOpacity={0.8}
          >
            <View style={[styles.tabItem, isFocused && styles.tabItemActive]}>
              <IconComponent
                size={22}
                color={isFocused ? '#B3C8E9' : '#71788A'}
                fill={isFocused && route.name === 'Dashboard' ? '#B3C8E9' : 'none'}
                strokeWidth={isFocused ? 2.5 : 2}
              />
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 95 : 85,
    backgroundColor: '#090B12',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 0,
  },
  tabItemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 80,
  },
  tabItemActive: {
    borderRadius: 20,
    backgroundColor: '#1E2540',
  },
  tabLabel: {
    marginTop: 6,
    fontSize: 11,
    color: '#71788A',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#B3C8E9',
    fontWeight: '700',
  },
});
