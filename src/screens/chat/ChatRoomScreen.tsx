import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Phone,
  Plus,
  Smile,
  Send,
  X,
  Camera,
  Image as ImageIcon,
} from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/theme';

const logoImage = require('../assets/logo/Logo.png');

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from '../types/chat';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;

export const ChatRoomScreen = ({ navigation, route }: Props) => {
  const { conversationId = '1', vendorName = 'Ezumrah' } = route.params || {};
  const { getChatMessages, sendMessage, markAsRead } = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [inputText, setInputText] = useState('');
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoadingMessages(true);
      const msgs = await getChatMessages(conversationId);
      setMessages(msgs);
      setIsLoadingMessages(false);

      // Mark conversation as read
      await markAsRead(conversationId);
    };

    loadMessages();
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = await sendMessage(conversationId, inputText.trim());
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const renderItem = ({ item }: { item: ChatMessage }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.isFromUser ? styles.senderContainer : styles.receiverContainer,
        ]}
      >
        <View
          style={[
            styles.bubble,
            item.isFromUser ? styles.senderBubble : styles.receiverBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.isFromUser ? styles.senderText : styles.receiverText,
            ]}
          >
            {item.message}
          </Text>
        </View>
        <Text style={styles.timeText}>{item.timestamp}</Text>
      </View>
    );
  };

  const QuickReplies = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.quickReplyContainer}
    >
      {['Thank you!', 'Thank you!', 'Thank you!'].map((reply, index) => (
        <TouchableOpacity key={index} style={styles.quickReplyChip}>
          <Text style={styles.quickReplyText}>{reply}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft color="black" size={24} />
          </TouchableOpacity>
          <Image
            source={logoImage}
            style={styles.avatar}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.headerName}>{vendorName}</Text>
            <Text style={styles.headerStatus}>Active 1 minute ago</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Phone color="#20A39E" size={24} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Footer */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={[styles.footer, showActions && styles.footerExpanded]}>
          <QuickReplies />

          <View style={styles.inputRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowActions(!showActions)}
            >
              {showActions ? (
                <X color="#4B5563" size={24} />
              ) : (
                <Plus color="#4B5563" size={24} />
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type a message..."
                placeholderTextColor={colors.textLight}
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity style={styles.smileButton}>
                <Smile color="#4B5563" size={20} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() && styles.sendButtonActive,
              ]}
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <Send color="white" size={20} />
            </TouchableOpacity>
          </View>

          {showActions && (
            <View style={styles.actionMenu}>
              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionIconCircle}>
                  <ImageIcon color="black" size={24} />
                </View>
                <Text style={styles.actionLabel}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionIconCircle}>
                  <Camera color="black" size={24} />
                </View>
                <Text style={styles.actionLabel}>Camera</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.s,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: spacing.s,
  },
  headerName: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  headerStatus: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
  },
  listContent: {
    padding: spacing.m,
  },
  messageContainer: {
    marginBottom: spacing.m,
    maxWidth: '80%',
  },
  senderContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    padding: spacing.m,
    borderRadius: 12,
    marginBottom: 4,
  },
  senderBubble: {
    backgroundColor: '#20A39E',
    borderTopRightRadius: 2,
  },
  receiverBubble: {
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 2,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    lineHeight: 20,
  },
  senderText: {
    color: 'white',
  },
  receiverText: {
    color: colors.text,
  },
  timeText: {
    fontSize: 10,
    color: colors.textLight,
    fontFamily: 'Inter_18pt-Regular',
  },
  footer: {
    paddingVertical: spacing.s,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: 'white',
  },
  footerExpanded: {
    paddingBottom: spacing.m,
  },
  quickReplyContainer: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.s,
  },
  quickReplyChip: {
    backgroundColor: '#E0F2F1',
    paddingHorizontal: spacing.m,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: spacing.s,
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },
  quickReplyText: {
    color: '#20A39E',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
  },
  iconButton: {
    marginRight: spacing.s,
    width: 24, // Fixed width to prevent shifting
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: spacing.m,
    height: 44,
    marginRight: spacing.s,
  },
  input: {
    flex: 1,
    height: 44, // Match container height
    paddingVertical: 0,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: colors.text,
  },
  smileButton: {
    marginLeft: spacing.xs,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#20A39E',
  },
  actionMenu: {
    flexDirection: 'row',
    paddingHorizontal: spacing.m,
    marginTop: spacing.m,
  },
  actionItem: {
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  actionIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  actionLabel: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
    color: colors.text,
  },
});
