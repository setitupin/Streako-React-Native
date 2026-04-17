import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ActivityHeatmapProps {
  heatData: string[][];
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ heatData }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Activity Heatmap</Text>
      <View style={styles.gridContainer}>
        {heatData.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((color, colIndex) => (
              <View 
                key={`${rowIndex}-${colIndex}`} 
                style={[styles.box, { backgroundColor: color }]} 
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#131926',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    color: '#8A96A8',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 16,
  },
  gridContainer: {
    gap: 8, // Gap between rows
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
});
