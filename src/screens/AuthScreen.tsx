import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock } from 'lucide-react-native';

export const AuthScreen = () => {
  const [isLoginBlock, setIsLoginBlock] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, signup } = useAuthStore();

  const handleAction = () => {
    if (isLoginBlock) {
      const success = login(username, password);
      if (!success) Alert.alert('Error', 'Invalid credentials. Use admin/admin');
    } else {
      if (!email || !username || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      const success = signup(email, username, password);
      if (!success) Alert.alert('Error', 'Could not sign up');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <View style={styles.formContainer}>
          <View style={styles.iconContainer}>
            <Lock size={48} color="#B3C8E9" />
          </View>
          <Text style={styles.title}>{isLoginBlock ? 'Welcome Back' : 'Create Account'}</Text>
          <Text style={styles.subtitle}>
            {isLoginBlock ? 'Sign in to access your dashboard' : 'Sign up to start tracking your habits'}
          </Text>

          {!isLoginBlock && (
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#71788A"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#71788A"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#71788A"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleAction}>
            <Text style={styles.primaryButtonText}>
              {isLoginBlock ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toggleButton} 
            onPress={() => setIsLoginBlock(!isLoginBlock)}
          >
            <Text style={styles.toggleText}>
              {isLoginBlock 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  keyboardView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#71788A',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#121A26',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E2540',
  },
  primaryButton: {
    backgroundColor: '#B3C8E9',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#090D14',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    color: '#B3C8E9',
    fontSize: 14,
    fontWeight: '600',
  },
});
