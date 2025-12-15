import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/theme';

const logoImage = require('../assets/logo/Logo.png');

interface ChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: boolean;
}

const chatData: ChatItem[] = [
  {
    id: '1',
    name: 'Ezumrah',
    message: 'Is there anything I can help you?',
    time: '09:18',
    unread: true,
  },
  {
    id: '2',
    name: 'Ezumrah',
    message: 'Is there anything I can help you?',
    time: '09:18',
    unread: true,
  },
  {
    id: '3',
    name: 'Ezumrah',
    message: 'Is there anything I can help you?',
    time: '09:18',
    unread: true,
  },
  {
    id: '4',
    name: 'Ezumrah',
    message: 'Is there anything I can help you?',
    time: '09:18',
    unread: true,
  },
];

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export const ChatScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatDetail')}
    >
      <Image source={logoImage} style={styles.avatar} resizeMode="contain" />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.message} numberOfLines={1}>
            {item.message}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.subtitle}>4 Unread messages</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color={colors.textLight} size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search Chat"
          placeholderTextColor={colors.textLight}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.s,
    paddingBottom: spacing.m,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: spacing.s,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.m,
    marginHorizontal: spacing.m,
    marginBottom: spacing.l,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.s,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: colors.text,
    paddingVertical: 0,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border, // Optional border
    marginRight: spacing.m,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#20A39E',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
    flex: 1,
    marginRight: spacing.s,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: spacing.m,
  },
});
