import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

export const TaskSearchBar = () => {
  return (
    <View style={styles.container}>
      <Search color="#8A96A8" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        placeholderTextColor="#8A96A8"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131926',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
});
