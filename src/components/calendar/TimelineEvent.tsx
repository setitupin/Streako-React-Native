import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export interface TimelineEventProps {
  time: string;
  category: string;
  accent: string;
  title: string;
  description: string;
  hasAvatars?: boolean;
  Icon?: any;
  isLast?: boolean;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  time,
  category,
  accent,
  title,
  description,
  hasAvatars,
  Icon,
  isLast,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Rail (Time & Timeline Stroke) */}
      <View style={styles.rail}>
        <Text style={styles.time}>{time}</Text>
        <View style={[styles.dot, { backgroundColor: accent }]} />
        {!isLast && <View style={styles.line} />}
      </View>

      {/* Main Card */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={[styles.cardAccent, { backgroundColor: accent }]} />
          
          <View style={styles.header}>
            <View style={[styles.badge, { backgroundColor: `${accent}15` }]}>
              <Text style={[styles.badgeText, { color: accent }]}>{category}</Text>
            </View>
            {Icon && <Icon size={16} color="#8A96A8" />}
          </View>
          
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          
          {hasAvatars && (
            <View style={styles.avatarsRow}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80' }} 
                style={styles.avatar} 
              />
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80' }} 
                style={[styles.avatar, { marginLeft: -10 }]} 
              />
              <View style={styles.avatarMore}>
                <Text style={styles.avatarMoreText}>+3</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  rail: {
    width: 60,
    alignItems: 'center',
    marginRight: 10,
  },
  time: {
    color: '#8A96A8',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 5,
    right: -3,
    zIndex: 10,
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: '#1E253B',
    position: 'absolute',
    right: -1,
    top: 11,
    bottom: -11, // stretch through padding
  },
  cardContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingRight: 20,
  },
  card: {
    backgroundColor: '#131926',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#8A96A8',
    fontSize: 13,
    lineHeight: 20,
  },
  avatarsRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#131926',
  },
  avatarMore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E253B',
    borderWidth: 2,
    borderColor: '#131926',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  avatarMoreText: {
    color: '#8A96A8',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
