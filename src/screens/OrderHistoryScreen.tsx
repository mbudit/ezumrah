import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList, MoreHorizontal, Star } from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';

const { width } = Dimensions.get('window');

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderHistory'>;

export const OrderHistoryScreen = ({ navigation }: Props) => {
  // Mock state: 'waiting' | 'success'
  const [orderStatus, setOrderStatus] = useState<'waiting' | 'success'>(
    'waiting',
  );

  const [secondsRemaining, setSecondsRemaining] = useState(792); // 00:13:12

  useEffect(() => {
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
  }, []);

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

  const RECENTLY_VIEWED = [
    {
      id: '1',
      title: 'Makkah Clock Royal Tower A Fairmont Hotel',
      rating: 4.5,
      reviews: 312,
      price: 'IDR 3.825.552',
      originalPrice: 'IDR 5.100.736',
      image: require('../assets/icons/kaaba.png'), // Placeholder, reuse kaaba
    },
    {
      id: '2',
      title: 'Makkah Clock Royal Tower A Fairmont Hotel',
      rating: 4.5,
      reviews: 312,
      price: 'IDR 3.825.552',
      originalPrice: 'IDR 5.100.736',
      image: require('../assets/icons/kaaba.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Orders</Text>
        <TouchableOpacity>
          <ClipboardList color="black" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Conditional Header for Waiting */}
        {orderStatus === 'waiting' && (
          <Text style={styles.waitingLabel}>Waiting for Payment</Text>
        )}

        {/* Order Card */}
        <View style={styles.card}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order ID: 1999120524</Text>
            <TouchableOpacity>
              <MoreHorizontal color="#666" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <View style={styles.orderContent}>
            <Image
              source={require('../assets/icons/kaaba.png')}
              style={styles.orderThumb}
            />
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>Haji Plus 2026</Text>

              <View style={styles.priceRow}>
                <Text style={styles.orderPrice}>IDR 240.000.000</Text>
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
              onPress={() => navigation.navigate('CompletePayment')}
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

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonText}>Go to Home</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  homeButtonText: {
    color: '#0D9488',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
});
