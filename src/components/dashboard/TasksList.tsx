import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PenTool, LineChart } from 'lucide-react-native';

const TaskCard = ({ title, subtitle, Icon, isActive }: any) => {
  return (
    <View style={styles.card}>
      {isActive && <View style={styles.activeBorder} />}
      <View style={styles.cardContent}>
        <View style={styles.iconBox}>
          <Icon color="#B3C8E9" size={18} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.taskTitle}>{title}</Text>
          <Text style={styles.taskSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.circleEmpty} />
      </View>
    </View>
  );
};

export const TasksList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Next in line</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <TaskCard 
        title="Refine UI System" 
        subtitle="High priority • 2h left" 
        Icon={PenTool} 
        isActive={true} 
      />
      
      <TaskCard 
        title="Analyze Q3 Streaks" 
        subtitle="Project • Tomorrow" 
        Icon={LineChart} 
        isActive={false} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#A99AFE',
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#131926',
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  activeBorder: {
    width: 4,
    backgroundColor: '#00F0FF',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 20, // To account for active border space
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1C253B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskSubtitle: {
    color: '#8A96A8',
    fontSize: 12,
  },
  circleEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2A344A',
  },
});
