import React, { useRef, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Plus, Sparkles, ListTodo } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  CreateHabit: undefined;
  CreateTask: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp>();

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const getAnimatedStyle = (index: number) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, -16 * index], // Move up
    });
    
    const scale = animation.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0, 0.8, 1],
    });

    const opacity = animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });

    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  };

  const closeAndNavigate = (route: 'CreateHabit' | 'CreateTask') => {
    toggleMenu();
    // Use short timeout to allow animation to start
    setTimeout(() => {
      navigation.navigate(route);
    }, 150);
  };

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.container}>
        {/* Create Habit */}
        <Animated.View style={[styles.menuItem, getAnimatedStyle(2)]}>
          <TouchableOpacity
            style={styles.labelContainer}
            activeOpacity={0.8}
            onPress={() => closeAndNavigate('CreateHabit')}
          >
            <Text style={styles.labelText}>Create Habit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            activeOpacity={0.8}
            onPress={() => closeAndNavigate('CreateHabit')}
          >
            <Sparkles color="#B3C8E9" size={20} strokeWidth={2} />
          </TouchableOpacity>
        </Animated.View>

        {/* Create Task */}
        <Animated.View style={[styles.menuItem, getAnimatedStyle(1)]}>
          <TouchableOpacity
            style={styles.labelContainer}
            activeOpacity={0.8}
            onPress={() => closeAndNavigate('CreateTask')}
          >
            <Text style={styles.labelText}>Create Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            activeOpacity={0.8}
            onPress={() => closeAndNavigate('CreateTask')}
          >
            <ListTodo color="#B3C8E9" size={20} strokeWidth={2} />
          </TouchableOpacity>
        </Animated.View>

        {/* Main FAB */}
        <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={toggleMenu}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Plus color={isOpen ? "#FFFFFF" : "#131926"} size={28} strokeWidth={2.5} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'rgba(7, 10, 15, 0.8)',
    zIndex: 90,
  },
  container: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    zIndex: 100,
    alignItems: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  labelContainer: {
    backgroundColor: '#1E2540',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E2540',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 24, // Slight squircle shape per mockup
    backgroundColor: '#A99AFE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A99AFE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    marginTop: 16,
  },
});
