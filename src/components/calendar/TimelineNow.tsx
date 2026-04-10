import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TimelineNow = ({ isLast = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rail}>
        <View style={styles.dotOuter}>
          <View style={styles.dotInner} />
        </View>
        {!isLast && <View style={styles.lineVertical} />}
      </View>
      <View style={styles.lineHorizontal} />
      <Text style={styles.nowText}>NOW</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginRight: 20,
  },
  rail: {
    width: 60,
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  dotOuter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#A99AFE30',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -7,
    top: -7,
    zIndex: 10,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A99AFE',
  },
  lineVertical: {
    width: 1,
    height: 38,
    backgroundColor: '#1E253B',
    position: 'absolute',
    right: -1,
    top: 7,
  },
  lineHorizontal: {
    flex: 1,
    height: 1,
    backgroundColor: '#1E253B',
  },
  nowText: {
    color: '#A99AFE',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
