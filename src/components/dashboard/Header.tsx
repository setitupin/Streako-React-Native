import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <Image
          source={require('../../../assets/flash-screen/streako.png')}
          style={styles.avatar}
        />
        <Text style={styles.title}>Streako</Text>
      </View>
      <TouchableOpacity>
        <Search color="#8A96A8" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#070A0F',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  title: {
    color: '#B3C8E9',
    fontSize: 16,
    fontWeight: '700',
  },
});
