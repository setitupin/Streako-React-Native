import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface StateCardProps {
  message: string;
  title?: string;
  tone?: 'default' | 'error';
  loading?: boolean;
}

export const StateCard: React.FC<StateCardProps> = ({
  message,
  title,
  tone = 'default',
  loading = false,
}) => {
  const isError = tone === 'error';

  return (
    <View style={[styles.card, isError && styles.cardError]}>
      {loading ? <ActivityIndicator color="#A99AFE" style={styles.loader} /> : null}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={[styles.message, isError && styles.messageError]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#131926',
  },
  cardError: {
    backgroundColor: '#27161F',
  },
  loader: {
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  message: {
    color: '#8A96A8',
    fontSize: 13,
    lineHeight: 20,
  },
  messageError: {
    color: '#F5C2CD',
  },
});
