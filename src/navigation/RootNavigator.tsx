import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import { AuthScreen } from '../screens/AuthScreen';
import { BottomTabs } from './BottomTabs';
import { CreateHabitScreen } from '../screens/CreateHabitScreen';
import { CreateTaskScreen } from '../screens/CreateTaskScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isLoggedIn = useAuthStore((state) => Boolean(state.token));

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="CreateHabit" component={CreateHabitScreen} />
            <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};
