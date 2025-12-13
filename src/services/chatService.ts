import { api } from './api';
import { ChatRoom, ChatMessage } from '../types';

const MOCK_CHAT_ROOMS: ChatRoom[] = [
    {
        id: '1',
        name: 'Tazkiyah Tour',
        lastMessage: 'Assalamualaikum, is the visa ready?',
        time: '10:30 AM',
        unreadCount: 2,
        avatar: require('../../assets/icons/vendor_logo.png'), // Placeholder
        vendorId: 'v1'
    }
];

export const chatService = {
  getChatRooms: async (): Promise<ChatRoom[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_CHAT_ROOMS);
      }, 500);
    });
  },

  getMessages: async (roomId: string): Promise<ChatMessage[]> => {
      return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
            { id: 'm1', text: 'Hello', time: '10:00 AM', isSender: true, isRead: true },
            { id: 'm2', text: 'Hi there!', time: '10:05 AM', isSender: false, isRead: true }
        ]);
      }, 500);
    });
  },

  sendMessage: async (roomId: string, text: string): Promise<ChatMessage> => {
      return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
                id: 'm_' + Date.now(),
                text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isSender: true,
                isRead: false
            });
          }, 300);
      })
  }
};
