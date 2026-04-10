import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Calendar, MoreVertical, ArrowDown } from 'lucide-react-native';

export interface TaskCardProps {
  title: string;
  category: string;
  categoryColor: string;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  hasAccent?: boolean;
  accentColor?: string;
  avatars?: string[];
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  category,
  categoryColor,
  priority,
  date,
  hasAccent = false,
  accentColor = '#00F0FF',
  avatars = [],
}) => {
  const getPriorityStyle = () => {
    switch (priority) {
      case 'High':
        return { bg: '#3A1926', color: '#F43F5E', icon: '!' };
      case 'Medium':
        return { bg: '#102B33', color: '#0EA5E9', icon: '=' };
      case 'Low':
        return { bg: '#1A202C', color: '#94A3B8', icon: '↓' };
      default:
        return { bg: '#1A202C', color: '#94A3B8', icon: '' };
    }
  };

  const priorityStyle = getPriorityStyle();

  return (
    <View style={styles.card}>
      {hasAccent && <View style={[styles.activeBorder, { backgroundColor: accentColor }]} />}
      
      <View style={styles.contentContainer}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.categoryPill}>
            <View style={[styles.categoryDot, { backgroundColor: categoryColor }]} />
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        </View>

        {/* Middle Row */}
        <View style={styles.metricsRow}>
          <View style={[styles.priorityBadge, { backgroundColor: priorityStyle.bg }]}>
            <Text style={[styles.priorityIcon, { color: priorityStyle.color }]}>
              {priorityStyle.icon}
            </Text>
            <Text style={[styles.priorityText, { color: priorityStyle.color }]}>
              {priority}
            </Text>
          </View>

          <View style={styles.dateContainer}>
            <Calendar color="#8A96A8" size={14} style={styles.calendarIcon} />
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>

        {/* Bottom Row (Optional Avatars & Menu) */}
        {(avatars.length > 0 || hasAccent) && (
          <View style={styles.bottomRow}>
            <View style={styles.avatarsContainer}>
              {avatars.map((uri, index) => (
                <Image 
                  key={index} 
                  source={{ uri }} 
                  style={[styles.avatar, { marginLeft: index > 0 ? -8 : 0 }]} 
                />
              ))}
            </View>
            <MoreVertical color="#8A96A8" size={20} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#131926',
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  activeBorder: {
    width: 4,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingLeft: 24, // extra space for absolute border overlay
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  categoryText: {
    color: '#A99AFE',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  priorityIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 6,
  },
  dateText: {
    color: '#8A96A8',
    fontSize: 13,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  avatarsContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#131926',
  },
});
