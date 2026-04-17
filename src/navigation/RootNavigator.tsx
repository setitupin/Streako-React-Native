import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import { AuthScreen } from '../screens/AuthScreen';
import { BottomTabs } from './BottomTabs';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isLoggedIn = useAuthStore((state) => Boolean(state.token));

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={BottomTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};
