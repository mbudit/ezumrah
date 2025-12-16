import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ArrowRight,
  Plane,
  Circle,
  CheckCircle2,
  Percent,
  Plus,
  ChevronDown,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { usePayment } from '../hooks/usePayment';
import { TransactionSummary, PaymentMethod } from '../types/payment';
import { useBooking } from '../hooks/useBooking';

type Props = NativeStackScreenProps<RootStackParamList, 'CompletePayment'>;

export const CompletePaymentScreen = ({ navigation, route }: Props) => {
  const { orderId = '1999120524' } = route.params || {};
  const { bookingState, setPaymentType } = useBooking('1');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(3580); // 00:59:40

  const { getTransactionSummary, getPaymentCategories } = usePayment();
  const [transaction, setTransaction] = useState<TransactionSummary | null>(
    null,
  );
  const [allMethods, setAllMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    if (route.params?.selectedPaymentMethod) {
      setPaymentMethod(route.params.selectedPaymentMethod);
    }
  }, [route.params?.selectedPaymentMethod]);

  useEffect(() => {
    const fetchData = async () => {
      const t = await getTransactionSummary(orderId);
      setTransaction(t);
      const cats = await getPaymentCategories();
      setAllMethods(cats.flatMap(c => c.data));
    };
    fetchData();
  }, [orderId]);

  const DEFAULT_PAYMENT_METHODS_IDS = ['QRIS', 'Toyyibpay', 'RHB'];

  const displayedMethods = useMemo(() => {
    // Create a list of methods to display: selected + defaults
    const selected = allMethods.find(m => m.id === paymentMethod);
    const defaults = allMethods.filter(
      m => DEFAULT_PAYMENT_METHODS_IDS.includes(m.id) && m.id !== paymentMethod,
    );

    const res = [];
    if (selected) res.push(selected);
    res.push(...defaults);
    return res;
  }, [paymentMethod, allMethods]);

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

  const renderRadio = (selected: boolean) => (
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Complete Your Payment</Text>
          <Text style={styles.orderId}>Order ID: {orderId}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Timer Card */}
        <View style={styles.card}>
          <View style={styles.timerHeader}>
            <Text style={styles.sectionTitle}>Complete pay within</Text>
            <View style={styles.timerContainer}>
              {renderTimerBox(time.h)}
              <Text style={styles.timerColon}>:</Text>
              {renderTimerBox(time.m)}
              <Text style={styles.timerColon}>:</Text>
              {renderTimerBox(time.s)}
            </View>
          </View>

          <Text style={styles.packageName}>
            {bookingState.packageInfo?.title || 'Package'}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flightCarouselContent}
          >
            {transaction?.flights.map(flight => (
              <View key={flight.id} style={styles.flightInfoCard}>
                <View style={styles.flightRow}>
                  <Plane color="#0D9488" size={16} />
                  <Text style={styles.flightText}>{flight.from}</Text>
                  <ArrowRight color="#333" size={16} />
                  <Text style={styles.flightText}>{flight.to}</Text>
                </View>
                <Text style={styles.flightDate}>{flight.date}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Payment Type */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Type</Text>
          <View style={{ height: spacing.m }} />

          <TouchableOpacity
            style={[
              styles.optionRow,
              bookingState.paymentType === 'Full' && styles.optionSelected,
            ]}
            onPress={() => setPaymentType('Full')}
          >
            <Text style={styles.optionText}>Full payment</Text>
            {renderRadio(bookingState.paymentType === 'Full')}
          </TouchableOpacity>

          <View style={{ height: spacing.m }} />

          <TouchableOpacity
            style={[
              styles.optionRow,
              bookingState.paymentType === 'Deposit' && styles.optionSelected,
            ]}
            onPress={() => setPaymentType('Deposit')}
          >
            <Text style={styles.optionText}>Deposit</Text>
            {renderRadio(bookingState.paymentType === 'Deposit')}
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <View style={styles.methodHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PaymentMethod', {
                  orderId,
                  selectedPaymentMethod: paymentMethod,
                })
              }
            >
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: spacing.m }} />

          <View style={{ height: spacing.m }} />

          {displayedMethods.map((methodData, index) => {
            return (
              <React.Fragment key={methodData.id}>
                <TouchableOpacity
                  style={[
                    styles.optionRow,
                    paymentMethod === methodData.id && styles.optionSelected,
                  ]}
                  onPress={() => setPaymentMethod(methodData.id)}
                >
                  <View style={styles.methodContent}>
                    <Image
                      source={methodData.image}
                      style={styles.methodLogo}
                    />
                    <Text style={styles.optionText}>{methodData.label}</Text>
                  </View>
                  {renderRadio(paymentMethod === methodData.id)}
                </TouchableOpacity>
                {index < displayedMethods.length - 1 && (
                  <View style={{ height: spacing.m }} />
                )}
              </React.Fragment>
            );
          })}
        </View>

        {/* Promo Code */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>You Can Save More!</Text>
          <View style={{ height: spacing.m }} />

          {bookingState.selectedVoucher ? (
            <View style={styles.selectedVoucherContainer}>
              <View style={styles.promoContent}>
                <View style={styles.promoIconBg}>
                  <Percent size={16} color="white" />
                </View>
                <View>
                  <Text style={styles.voucherCode}>
                    {bookingState.selectedVoucher.code}
                  </Text>
                  <Text style={styles.voucherDiscount}>
                    {bookingState.selectedVoucher.type === 'percentage'
                      ? `${bookingState.selectedVoucher.discount}% off`
                      : `IDR ${bookingState.selectedVoucher.discount.toLocaleString(
                          'id-ID',
                        )} off`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('PromoCode')}
              >
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.promoButton}
              onPress={() => navigation.navigate('PromoCode')}
            >
              <View style={styles.promoContent}>
                <View style={styles.promoIconBg}>
                  <Percent size={16} color="white" />
                </View>
                <Text style={styles.promoText}>Promos or Voucher Codes</Text>
              </View>
              <View style={styles.plusIconBg}>
                <Plus size={16} color="white" />
              </View>
            </TouchableOpacity>
          )}

          <Text style={styles.availablePromoText}>
            You have 5 available promo(s)
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <TouchableOpacity style={styles.totalValueContainer}>
            <Text style={styles.totalValue}>
              $
              {bookingState.totalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
            <ChevronDown size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate('PaymentInstruction')}
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    padding: spacing.m,
    backgroundColor: 'white',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  orderId: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_18pt-Regular',
  },
  content: {
    padding: spacing.m,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  sectionTitle: {
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
    paddingVertical: 4,
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
  packageName: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
    marginBottom: spacing.m,
  },
  flightCarouselContent: {
    gap: spacing.m,
    paddingRight: spacing.m, // Add padding to end of scroll
  },
  flightInfoCard: {
    backgroundColor: '#E9F6F5',
    padding: spacing.m,
    borderRadius: 8,
    width: 260, // Fixed width for carousel items
  },
  flightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  flightText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter_18pt-Medium',
  },
  flightDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E9F6F5',
    padding: spacing.m,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: '#0D9488', // Highlight border if needed, mostly implied by content
  },
  optionText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter_18pt-Medium',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#0D9488',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0D9488',
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 12,
    color: '#0D9488',
    fontFamily: 'Inter_18pt-Medium',
    textDecorationLine: 'underline',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodLogoPlaceholder: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    width: 60,
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E9F6F5',
    padding: spacing.m,
    borderRadius: 8,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  promoIconBg: {
    backgroundColor: '#333',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  plusIconBg: {
    backgroundColor: 'black',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availablePromoText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_18pt-Regular',
    marginTop: spacing.s,
    marginLeft: 4,
  },
  footer: {
    backgroundColor: 'white',
    padding: spacing.m,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold', // Using Bold to match image "Total Price" looks bold/dark
    color: '#666', // Or slightly lighter than black
  },
  totalValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  payButton: {
    backgroundColor: '#0D9488',
    paddingVertical: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
  methodLogo: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
  selectedVoucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E9F6F5',
    padding: spacing.m,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0D9488',
  },
  voucherCode: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter_18pt-Bold',
  },
  voucherDiscount: {
    fontSize: 12,
    color: '#0D9488',
    fontFamily: 'Inter_18pt-Medium',
  },
  changeText: {
    fontSize: 12,
    color: '#0D9488',
    fontFamily: 'Inter_18pt-Medium',
    textDecorationLine: 'underline',
  },
});
