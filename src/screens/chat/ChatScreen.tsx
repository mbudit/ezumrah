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
import { colors, spacing, typography } from '../../theme/theme';

const logoImage = require('../../assets/logo/Logo.png');

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useChat } from '../../hooks/useChat';
import { ChatConversation } from '../../types/chat';

export const ChatScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { conversations, isLoading, getTotalUnreadCount } = useChat();

  const renderItem = ({ item }: { item: ChatConversation }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('ChatRoom', {
          conversationId: item.id,
          vendorName: item.vendorName,
        })
      }
    >
      <View style={styles.avatarContainer}>
        <Image source={logoImage} style={styles.avatar} resizeMode="contain" />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.vendorName}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.message} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          <Text style={styles.time}>{item.timestamp}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.subtitle}>
          {getTotalUnreadCount()} Unread message
          {getTotalUnreadCount() !== 1 ? 's' : ''}
        </Text>
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
        data={conversations}
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
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.m,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: 'white',
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
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Inter_18pt-Bold',
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
