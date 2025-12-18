import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList, MoreHorizontal, Star } from 'lucide-react-native';
import { colors, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import { useOrderData } from '../../hooks/useOrderData';

export const OrderScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data, isLoading } = useOrderData();
  const activeOrder = data?.activeOrder;
  const RECENTLY_VIEWED = data?.recentlyViewed || [];

  // Use state from hook data if available, or default to waiting
  const orderStatus = activeOrder?.status || 'waiting';

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Timer logic - initializing from activeOrder.secondsRemaining
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    if (activeOrder?.secondsRemaining) {
      setSecondsRemaining(activeOrder.secondsRemaining);
    }
  }, [activeOrder]);

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining > 0]); // Dependency change to restart if seconds updated? Actually just [] or [secondsRemaining] careful with loops.
  // Better: start interval once seconds is set > 0.
  // Simplified:

  /* 
     Ideally, the hook should manage the timer or provide a timestamp to calculate diff, 
     but for now we sync slightly.
  */

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      h: hours.toString().padStart(2, '0'),
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0'),
    };
  };

  const time = formatTime(secondsRemaining);

  const renderTimerBox = (value: string) => (
    <View style={styles.timerBox}>
      <Text style={styles.timerText}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Orders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <ClipboardList color="black" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Conditional Header for Waiting */}
        {orderStatus === 'waiting' && (
          <Text style={styles.waitingLabel}>Waiting for Payment</Text>
        )}

        {/* Order Card */}
        {activeOrder ? (
          <View style={styles.card}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order ID: {activeOrder.id}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MoreHorizontal color="#666" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            <View style={styles.orderContent}>
              <Image source={activeOrder.image} style={styles.orderThumb} />
              <View style={styles.orderInfo}>
                <Text style={styles.orderTitle}>{activeOrder.title}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.orderPrice}>{activeOrder.price}</Text>
                  {orderStatus === 'waiting' && (
                    <View style={styles.timerContainer}>
                      {renderTimerBox(time.h)}
                      <Text style={styles.timerColon}>:</Text>
                      {renderTimerBox(time.m)}
                      <Text style={styles.timerColon}>:</Text>
                      {renderTimerBox(time.s)}
                    </View>
                  )}
                </View>
              </View>
            </View>

            {orderStatus === 'waiting' ? (
              <TouchableOpacity
                style={styles.completePaymentButton}
                onPress={() => {
                  // Navigate to Home tab, then to CompletePayment screen
                  const parent = navigation.getParent();
                  if (parent) {
                    parent.navigate('Home' as any, {
                      screen: 'CompletePayment',
                    });
                  }
                }}
              >
                <Text style={styles.completePaymentText}>
                  Complete the Payment
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.successFooter}>
                <Text style={styles.successText}>Success</Text>
              </View>
            )}
          </View>
        ) : (
          !isLoading && <Text>No active orders</Text>
        )}

        {/* Support Banner */}
        <View style={styles.supportBanner}>
          <View style={styles.supportIconContainer}>
            <Text style={styles.supportIconText}>Hallo</Text>
            <Text style={styles.supportIconSub}>ezumrah.com</Text>
          </View>
          <View style={styles.supportContent}>
            <Text style={styles.supportTitle}>
              Any problem with your order?
            </Text>
            <Text style={styles.supportDesc}>
              We address urgent needs in 1 hour. Get connected in 30 seconds.
            </Text>
            <TouchableOpacity>
              <Text style={styles.supportLink}>Go to halo ezumrah.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recently Viewed */}
        <Text style={styles.sectionTitle}>Your Recently Viewed</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentList}
        >
          {RECENTLY_VIEWED.map(item => (
            <View key={item.id} style={styles.recentCard}>
              <Image source={item.image} style={styles.recentImage} />
              <View style={styles.recentContent}>
                <Text style={styles.recentTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.ratingRow}>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={10} color="#FBBF24" fill="#FBBF24" />
                    ))}
                  </View>
                  <Text style={styles.ratingText}>
                    {item.rating}/5 ({item.reviews} review)
                  </Text>
                </View>
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.taxText}>(Excluding taxes)</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home' as any)}
        >
          <Text style={styles.homeButtonText}>Go to Home</Text>
        </TouchableOpacity> */}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Options Modal */}
      {/* Options Modal */}
      {modalVisible && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ fontSize: 20, color: 'black' }}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Options</Text>
              </View>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setModalVisible(false);
                  // Handle See Details
                }}
              >
                <Text style={styles.modalOptionText}>See Details</Text>
              </TouchableOpacity>
              <View style={styles.modalSeparator} />
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => setDeleteModalVisible(true), 300); // 300ms delay for smooth transition
                }}
              >
                <Text style={styles.modalOptionTextDelete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      )}

      {/* Delete Confirmation Modal */}
      {/* Delete Confirmation Modal */}
      {deleteModalVisible && (
        <View style={styles.deleteModalOverlay}>
          <TouchableWithoutFeedback
            onPress={() => setDeleteModalVisible(false)}
          >
            <View style={styles.deleteModalOverlayBackground} />
          </TouchableWithoutFeedback>
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalTitle}>Delete Order</Text>
            <Text style={styles.deleteModalDesc}>
              All related orders will be removed and cannot be restored once
              deleted.
            </Text>
            <TouchableOpacity
              style={styles.deleteConfirmButton}
              onPress={() => {
                setDeleteModalVisible(false);
                // Handle Delete Logic
              }}
            >
              <Text style={styles.deleteConfirmButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteCancelButton}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.deleteCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.m,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  content: {
    padding: spacing.m,
  },
  waitingLabel: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
    marginBottom: spacing.s,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  orderId: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: spacing.m,
  },
  orderContent: {
    marginBottom: spacing.m,
    // alignItems: 'flex-start', // Removing this as default column is fine, need Row for Image + Info?? No, image is icon size
  },
  orderThumb: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginBottom: 8,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderPrice: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timerBox: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timerText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
  },
  timerColon: {
    color: '#EF4444',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
  },
  completePaymentButton: {
    backgroundColor: '#0D9488',
    paddingVertical: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  completePaymentText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
  },
  successFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginTop: spacing.s,
    paddingTop: spacing.m,
  },
  successText: {
    color: '#10B981', // Green
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
  },
  supportBanner: {
    backgroundColor: '#EDFDFD', // Light blue/mint
    borderRadius: 12,
    padding: spacing.m,
    flexDirection: 'row',
    marginBottom: spacing.l,
    alignItems: 'center',
    gap: spacing.m,
  },
  supportIconContainer: {
    backgroundColor: '#CCA700', // Gold-ish
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportIconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  supportIconSub: {
    color: 'white',
    fontSize: 8,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 2,
  },
  supportDesc: {
    fontSize: 12,
    color: '#4B5563',
    fontFamily: 'Inter_18pt-Regular',
    marginBottom: 4,
  },
  supportLink: {
    fontSize: 12,
    color: '#0D9488',
    fontFamily: 'Inter_18pt-Bold',
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.m,
  },
  recentList: {
    paddingRight: spacing.m,
    paddingBottom: spacing.m,
  },
  recentCard: {
    width: width * 0.45,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    paddingBottom: spacing.m,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  recentImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: spacing.s,
  },
  recentContent: {
    paddingHorizontal: spacing.s,
  },
  recentTitle: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
    height: 32,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: 10,
    color: '#666',
  },
  originalPrice: {
    fontSize: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#0D9488',
  },
  taxText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  homeButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0D9488',
    paddingVertical: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: spacing.l,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.m,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: spacing.m,
    paddingBottom: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    marginHorizontal: spacing.s,
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  modalOption: {
    paddingVertical: spacing.m,
    // paddingHorizontal: spacing.m, // Removed as parent has padding
    // alignItems: 'center', // Default align left for list items usually better in bottom sheet? Or center? Reference had center items? Reference location modal had list items.
    // I'll keep default flex-start (left) for standard list look, or center if user wants.
    // Let's stick to standard layout. Reference LocationModal uses Row with Icon and Text.
    // Simple text options => default row or text block.
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  modalOptionTextDelete: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Medium',
    color: '#EF4444', // Red
  },
  modalSeparator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  /* Delete Modal Styles */
  deleteModalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000, // Higher than options modal (1000)
  },
  deleteModalOverlayBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  deleteModalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.l,
    alignItems: 'center',
  },
  deleteModalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.s,
    textAlign: 'center',
  },
  deleteModalDesc: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: spacing.l,
    lineHeight: 20,
  },
  deleteConfirmButton: {
    width: '100%',
    backgroundColor: '#FEE2E2', // Light red
    paddingVertical: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  deleteConfirmButtonText: {
    color: '#EF4444', // Red
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
  deleteCancelButton: {
    width: '100%',
    backgroundColor: '#0D9488', // Primary Teal
    paddingVertical: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteCancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
});
