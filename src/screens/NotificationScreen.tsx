import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, X, Bell } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/theme';

interface NotificationScreenProps {
  onBackPress: () => void;
}

const notifications = [
  {
    id: '1',
    title: 'Your Payment is Pending',
    description: 'Kindly complete the payment of RM 30.334 for your order ID 1999120524 before 29-09-2026 08:00 AM to avoid cancellation',
    timestamp: '03-03-2026 07:37',
    image: 'https://placehold.co/100x100/png', // Placeholder for Kaaba image
    type: 'payment_pending',
  },
  {
    id: '2',
    title: 'Your Payment is Pending',
    description: 'Kindly complete the payment of RM 30.334 for your order ID 1999120524 before 29-09-2026 08:00 AM to avoid cancellation',
    timestamp: '03-03-2026 07:37',
    image: 'https://placehold.co/100x100/png',
    type: 'payment_pending',
  },
  {
    id: '3',
    title: 'Confirm Receipt',
    description: 'Kindly verify that your order ID 1999120524 has been paid. Thank you for shopping with Ezumrah.com!',
    timestamp: '03-03-2026 07:37',
    image: 'https://placehold.co/100x100/png',
    type: 'confirm_receipt',
  },
  {
    id: '4',
    title: 'Confirm Receipt',
    description: 'Kindly verify that your order ID 1999120524 has been paid. Thank you for shopping with Ezumrah.com!',
    timestamp: '03-03-2026 07:37',
    image: 'https://placehold.co/100x100/png',
    type: 'confirm_receipt',
  },
  {
    id: '5',
    title: 'Confirm Receipt',
    description: 'Kindly verify that your order ID 1999120524 has been paid. Thank you for shopping with Ezumrah.com!',
    timestamp: '03-03-2026 07:37',
    image: 'https://placehold.co/100x100/png',
    type: 'confirm_receipt',
  },
];

export const NotificationScreen = ({ onBackPress }: NotificationScreenProps) => {
  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <View style={styles.notificationItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>
          {item.type === 'payment_pending' ? (
            <>
              Kindly complete the payment of <Text style={styles.highlightText}>RM 30.334</Text> for your order ID <Text style={styles.highlightText}>1999120524</Text> before <Text style={styles.highlightText}>29-09-2026 08:00 AM</Text> to avoid cancellation
            </>
          ) : (
            <>
              Kindly verify that your order ID <Text style={styles.highlightText}>1999120524</Text> has been paid. Thank you for shopping with Ezumrah.com!
            </>
          )}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerIconContainer}>
           <Image source={require('../assets/icons/notif.png')} style={styles.bannerIcon} resizeMode="contain" />
        </View>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerText}>
            Allow notifcation and get the latest updates on orders and promos. <Text style={styles.allowLink}>Allow</Text>
          </Text>
        </View>
        <TouchableOpacity>
          <X color={colors.textLight} size={20} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    marginRight: spacing.m,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1', // Light yellow/beige
    padding: spacing.m,
  },
  bannerIconContainer: {
    marginRight: spacing.m,
  },
  bannerIcon: {
    width: 24,
    height: 24,
  },
  bannerContent: {
    flex: 1,
    marginRight: spacing.s,
  },
  bannerText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
    lineHeight: 18,
  },
  allowLink: {
    color: '#007AFF', // Blue link color
    fontFamily: 'Inter_18pt-SemiBold',
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: spacing.m,
    backgroundColor: 'white',
  },
  itemImage: {
    width: 60,
    height: 40,
    borderRadius: 4,
    marginRight: spacing.m,
    backgroundColor: '#E0E0E0',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
    marginBottom: spacing.s,
    lineHeight: 18,
  },
  highlightText: {
    color: '#20A39E', // Teal color for highlights
    fontFamily: 'Inter_18pt-Regular',
  },
  timestamp: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'Inter_18pt-Regular',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
});
