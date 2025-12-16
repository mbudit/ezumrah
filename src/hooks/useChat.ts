import { useState, useEffect } from 'react';
import { ChatConversation, ChatMessage } from '../types/chat';

const MOCK_CONVERSATIONS: ChatConversation[] = [
  {
    id: '1',
    vendorName: 'Ezumrah Support',
    lastMessage: 'Is there anything I can help you?',
    timestamp: '09:18',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '2',
    vendorName: 'Al-Hijaz Travel',
    lastMessage: 'Thank you for your order!',
    timestamp: '08:45',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '3',
    vendorName: 'Makkah Tours',
    lastMessage: 'Your package has been confirmed',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '4',
    vendorName: 'Umrah Express',
    lastMessage: 'We have received your payment',
    timestamp: 'Yesterday',
    unreadCount: 1,
    isOnline: false,
  },
];

export const useChat = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      setConversations(MOCK_CONVERSATIONS);
      setIsLoading(false);
    };

    fetchConversations();
  }, []);

  const getChatMessages = async (conversationId: string): Promise<ChatMessage[]> => {
    // Mock implementation - would fetch from API
    await new Promise(resolve => setTimeout(() => resolve(true), 500));
    
    // Mock messages for demonstration
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        conversationId,
        senderId: 'vendor-1',
        senderName: 'Ezumrah Support',
        message: 'Assalamualaikum warahmatullahi wabarakatuh.',
        timestamp: '9:30',
        isFromUser: false,
      },
      {
        id: '2',
        conversationId,
        senderId: 'user-1',
        senderName: 'You',
        message: 'Waalaikumussalam.',
        timestamp: '9:32',
        isFromUser: true,
      },
    ];
    
    return mockMessages;
  };

  const sendMessage = async (conversationId: string, message: string): Promise<ChatMessage> => {
    // Mock implementation - would send to API
    await new Promise(resolve => setTimeout(() => resolve(true), 500));
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      conversationId,
      senderId: 'user-1',
      senderName: 'You',
      message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      isFromUser: true,
    };
    
    // Update the conversation's last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, lastMessage: message, timestamp: newMessage.timestamp }
          : conv
      )
    );
    
    return newMessage;
  };

  const markAsRead = async (conversationId: string): Promise<void> => {
    // Mock implementation - would call API
    await new Promise(resolve => setTimeout(() => resolve(true), 500));
    
    // Update local state
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  return {
    conversations,
    isLoading,
    getChatMessages,
    sendMessage,
    markAsRead,
    getTotalUnreadCount,
  };
};
