import React, { useState, useEffect } from 'react';
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

interface CompletePaymentScreenProps {
  onBackPress: () => void;
  onPaymentMethodPress?: () => void;
  onPayNow?: () => void;
  selectedPaymentMethod?: string;
  orderId?: string;
}

export const CompletePaymentScreen = ({
  onBackPress,
  onPaymentMethodPress,
  onPayNow,
  selectedPaymentMethod,
  orderId = '1999120524',
}: CompletePaymentScreenProps) => {
  const [paymentType, setPaymentType] = useState('Full payment');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(3580); // 00:59:40
  useEffect(() => {
    if (selectedPaymentMethod) {
      setPaymentMethod(selectedPaymentMethod);
    }
  }, [selectedPaymentMethod]);

  const PAYMENT_METHODS_LOOKUP: Record<string, { label: string; image: any }> =
    {
      QRIS: { label: 'QRIS', image: require('../assets/icons/qris.png') },
      BCA: {
        label: 'BCA Virtual Account',
        image: require('../assets/icons/bca.png'),
      },
      Mandiri: {
        label: 'Mandiri Virtual Account',
        image: require('../assets/icons/mandiri.png'),
      },
      BNI: {
        label: 'BNI Virtual Account',
        image: require('../assets/icons/bni.png'),
      },
      BSI: {
        label: 'BSI Virtual Account',
        image: require('../assets/icons/bsi.png'),
      },
      CIMB: {
        label: 'CIMB Niaga Virtual Account',
        image: require('../assets/icons/cimbniaga.png'),
      },
      RHB: {
        label: 'RHB Bank Virtual Account',
        image: require('../assets/icons/rhbank.png'),
      },
      Toyyibpay: {
        label: 'Toyyibpay Virtual Account',
        image: require('../assets/icons/toyyibpay.png'),
      },
      GoPay: { label: 'GoPay', image: require('../assets/icons/gopay.png') },
      OVO: { label: 'OVO', image: require('../assets/icons/ovo.png') },
      ShopeePay: {
        label: 'ShopeePay',
        image: require('../assets/icons/shopeepay.png'),
      },
      Dana: { label: 'Dana', image: require('../assets/icons/dana.png') },
      CC: {
        label: 'Visa/Mastercard',
        image: require('../assets/icons/visamastercard.png'),
      },
    };

  const DEFAULT_PAYMENT_METHODS = ['QRIS', 'Toyyibpay', 'RHB'];

  // Combine selected method with default methods, valid only if in lookup
  const displayedMethods = [
    ...(paymentMethod && PAYMENT_METHODS_LOOKUP[paymentMethod]
      ? [paymentMethod]
      : []),
    ...DEFAULT_PAYMENT_METHODS.filter(m => m !== paymentMethod),
  ];

  const FLIGHT_DETAILS = [
    {
      id: '1',
      from: 'Jakarta',
      to: 'Jeddah',
      date: 'Wed, 04 Sept 2025 · 15:50',
    },
    {
      id: '2',
      from: 'Jeddah',
      to: 'Jakarta',
      date: 'Thu, 18 Sept 2025 · 20:10',
    },
  ];

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
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
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

          <Text style={styles.packageName}>Haji Plus 2027</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flightCarouselContent}
          >
            {FLIGHT_DETAILS.map(flight => (
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
              paymentType === 'Full payment' && styles.optionSelected,
            ]}
            onPress={() => setPaymentType('Full payment')}
          >
            <Text style={styles.optionText}>Full payment</Text>
            {renderRadio(paymentType === 'Full payment')}
          </TouchableOpacity>

          <View style={{ height: spacing.m }} />

          <TouchableOpacity
            style={[
              styles.optionRow,
              paymentType === 'Deposit' && styles.optionSelected,
            ]}
            onPress={() => setPaymentType('Deposit')}
          >
            <Text style={styles.optionText}>Deposit</Text>
            {renderRadio(paymentType === 'Deposit')}
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <View style={styles.methodHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity onPress={onPaymentMethodPress}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: spacing.m }} />

          <View style={{ height: spacing.m }} />

          {displayedMethods.map((method, index) => {
            const methodData = PAYMENT_METHODS_LOOKUP[method];
            if (!methodData) return null;

            return (
              <React.Fragment key={method}>
                <TouchableOpacity
                  style={[
                    styles.optionRow,
                    paymentMethod === method && styles.optionSelected,
                  ]}
                  onPress={() => setPaymentMethod(method)}
                >
                  <View style={styles.methodContent}>
                    <Image
                      source={methodData.image}
                      style={styles.methodLogo}
                    />
                    <Text style={styles.optionText}>{methodData.label}</Text>
                  </View>
                  {renderRadio(paymentMethod === method)}
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
          <TouchableOpacity style={styles.promoButton}>
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
            <Text style={styles.totalValue}>$35.000</Text>
            <ChevronDown size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={onPayNow}>
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
});
