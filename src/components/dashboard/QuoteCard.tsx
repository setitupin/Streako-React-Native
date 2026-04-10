import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const QuoteCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>
        "Focus is a sanctuary where momentum is born."
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 40,
    marginTop: 10,
    padding: 30,
    backgroundColor: '#0D131F',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    color: '#8A96A8',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
});
