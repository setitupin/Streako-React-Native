import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#090D14' }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
