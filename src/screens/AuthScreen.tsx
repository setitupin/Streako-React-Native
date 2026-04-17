import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock } from 'lucide-react-native';
import { useHealthCheckQuery, useLoginMutation, useRegisterMutation } from '../api/queries/auth';
import { API_BASE_URL, ApiError } from '../api/client';

export const AuthScreen = () => {
  const [isLoginBlock, setIsLoginBlock] = useState(true);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const healthCheckQuery = useHealthCheckQuery();

  const isSubmitting = loginMutation.isPending || registerMutation.isPending;

  const healthStatusText = useMemo(() => {
    if (healthCheckQuery.isLoading) {
      return 'Checking backend status...';
    }

    if (healthCheckQuery.isError) {
      return `Backend unavailable at ${API_BASE_URL}`;
    }

    return `${healthCheckQuery.data?.message || 'Backend connected'} (${API_BASE_URL})`;
  }, [healthCheckQuery.data?.message, healthCheckQuery.isError, healthCheckQuery.isLoading]);

  const handleError = (error: unknown) => {
    const message =
      error instanceof ApiError
        ? error.message
        : 'Unable to reach the Streako API. Check that the backend is running.';

    Alert.alert('Request Failed', message);
  };

  const handleAction = async () => {
    if (isLoginBlock) {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter your email and password');
        return;
      }

      try {
        await loginMutation.mutateAsync({ email, password });
      } catch (error) {
        handleError(error);
      }
    } else {
      if (!email || !password) {
        Alert.alert('Error', 'Email and password are required');
        return;
      }

      try {
        await registerMutation.mutateAsync({
          email,
          password,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          timezone: 'Asia/Kolkata',
        });
      } catch (error) {
        handleError(error);
      }
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

          <Text style={styles.statusText}>{healthStatusText}</Text>

          {!isLoginBlock && (
            <TextInput
              style={styles.input}
              placeholder="First name"
              placeholderTextColor="#71788A"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
          )}

          {!isLoginBlock && (
            <TextInput
              style={styles.input}
              placeholder="Last name"
              placeholderTextColor="#71788A"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#71788A"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#71788A"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
            onPress={handleAction}
            disabled={isSubmitting}
          >
            <Text style={styles.primaryButtonText}>
              {isSubmitting ? 'Please wait...' : isLoginBlock ? 'Sign In' : 'Sign Up'}
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
    marginBottom: 20,
  },
  statusText: {
    color: '#8A96A8',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 20,
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
  primaryButtonDisabled: {
    opacity: 0.7,
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
