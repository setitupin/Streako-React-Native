import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Plus } from 'lucide-react-native';

export const FloatingActionButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Plus color="#131926" size={24} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    zIndex: 100,
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
  },
});
