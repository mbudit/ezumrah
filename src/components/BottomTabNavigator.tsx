import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Home,
  FileText,
  Heart,
  MessageSquare,
  User,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';

interface BottomTabNavigatorProps {
  activeTab?: 'Home' | 'Orders' | 'Wishlist' | 'Chat' | 'Profile';
  onTabPress?: (
    tab: 'Home' | 'Orders' | 'Wishlist' | 'Chat' | 'Profile',
  ) => void;
}

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  activeTab = 'Home',
  onTabPress,
}) => {
  const tabs = [
    { name: 'Home', icon: Home, label: 'Home' },
    { name: 'Orders', icon: FileText, label: 'Orders' },
    { name: 'Wishlist', icon: Heart, label: 'Wishlist' },
    { name: 'Chat', icon: MessageSquare, label: 'Chat' },
    { name: 'Profile', icon: User, label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.name;
        const Icon = tab.icon;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() =>
              onTabPress?.(
                tab.name as 'Home' | 'Orders' | 'Wishlist' | 'Chat' | 'Profile',
              )
            }
          >
            <Icon color={isActive ? '#20A39E' : colors.textLight} size={24} />
            <Text
              style={[
                styles.label,
                { color: isActive ? '#20A39E' : colors.textLight },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingVertical: spacing.s,
    paddingBottom: spacing.m, // Safe area padding
    borderTopWidth: 1,
    borderTopColor: colors.border,
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: 'Inter_18pt-Regular',
  },
});
