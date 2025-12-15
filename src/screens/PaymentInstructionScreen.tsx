import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Plane,
  ArrowRight,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentInstruction'>;

const PAYMENT_METHODS_LOOKUP: Record<string, { label: string; image: any }> = {
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

export const PaymentInstructionScreen = ({ navigation, route }: Props) => {
  const { paymentMethod = 'BCA', orderId = '1999120524' } = route.params || {};
  const [secondsRemaining, setSecondsRemaining] = useState(3580); // 00:59:40
  const [expandedInstruction, setExpandedInstruction] = useState<string | null>(
    null,
  );

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

  const toggleExpand = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedInstruction(expandedInstruction === title ? null : title);
  };

  const paymentInfo = PAYMENT_METHODS_LOOKUP[paymentMethod] || {
    label: paymentMethod,
    image: null,
  };

  const HOW_TO_PAY_STEPS = [
    {
      title: `${paymentInfo.label} Mobile`,
      content: 'Step 1: Open App...\nStep 2: Select Pay...',
    },
    {
      title: 'Internet Banking',
      content: 'Step 1: Login...\nStep 2: Select Transfer...',
    },
    { title: 'ATM', content: 'Step 1: Insert Card...\nStep 2: Enter PIN...' },
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
          <Text style={styles.headerTitle}>{paymentInfo.label}</Text>
          <Text style={styles.orderId}>Order ID: {orderId}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Pay Before Card */}
        <View style={styles.card}>
          <View style={styles.timerHeader}>
            <View>
              <Text style={styles.payBeforeLabel}>Pay Before</Text>
              <Text style={styles.payBeforeDate}>12 Sep 2025, 00:06 WIB</Text>
            </View>
            <View style={styles.timerContainer}>
              {renderTimerBox(time.h)}
              <Text style={styles.timerColon}>:</Text>
              {renderTimerBox(time.m)}
              <Text style={styles.timerColon}>:</Text>
              {renderTimerBox(time.s)}
            </View>
          </View>

          <View style={styles.separator} />

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

        {/* Transfer To Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Transfer To</Text>
          <View style={{ height: spacing.m }} />

          <View style={styles.accountContainer}>
            {paymentInfo.image && (
              <Image source={paymentInfo.image} style={styles.accountLogo} />
            )}
            <Text style={styles.accountNumber}>1420 2010 0538 3789</Text>
            <TouchableOpacity onPress={() => console.log('Copied')}>
              <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <View>
            <Text style={styles.totalPaymentLabel}>Total Payment</Text>
            <Text style={styles.totalPaymentValue}>$35.000</Text>
          </View>
        </View>

        {/* How to Pay Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>How to Pay</Text>
          <View style={{ height: spacing.s }} />

          {HOW_TO_PAY_STEPS.map((step, index) => {
            const isExpanded = expandedInstruction === step.title;
            return (
              <View key={step.title}>
                <TouchableOpacity
                  style={styles.instructionHeader}
                  onPress={() => toggleExpand(step.title)}
                >
                  <Text style={styles.instructionTitle}>{step.title}</Text>
                  {isExpanded ? (
                    <ChevronUp size={20} color="#333" />
                  ) : (
                    <ChevronDown size={20} color="#333" />
                  )}
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.instructionContent}>
                    <Text style={styles.instructionText}>{step.content}</Text>
                  </View>
                )}
                {index < HOW_TO_PAY_STEPS.length - 1 && (
                  <View style={styles.instructionSeparator} />
                )}
              </View>
            );
          })}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkStatusButton}
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <Text style={styles.checkStatusText}>Check the Payment Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changeMethodButton}
          onPress={() => navigation.navigate('PaymentMethod')}
        >
          <Text style={styles.changeMethodText}>Change Payment Method</Text>
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
    fontSize: 16,
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
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.m,
  },
  payBeforeLabel: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
    marginBottom: 4,
  },
  payBeforeDate: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#EF4444',
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
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: spacing.m,
  },
  packageName: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
    marginBottom: spacing.m,
  },
  flightCarouselContent: {
    paddingRight: spacing.m,
  },
  flightInfoCard: {
    backgroundColor: '#E9F6F5',
    padding: spacing.m,
    borderRadius: 8,
    marginRight: spacing.m,
    minWidth: 250,
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
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F6F5',
    padding: spacing.m,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  accountLogo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  accountNumber: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  copyText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#2563EB',
  },
  totalPaymentLabel: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
    marginBottom: 4,
  },
  totalPaymentValue: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    backgroundColor: '#E9F6F5',
    padding: spacing.m,
    borderRadius: 8,
  },
  instructionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.m,
  },
  instructionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  instructionContent: {
    paddingBottom: spacing.m,
    paddingLeft: spacing.s,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_18pt-Regular',
    lineHeight: 20,
  },
  instructionSeparator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  footer: {
    backgroundColor: 'white',
    padding: spacing.m,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkStatusButton: {
    backgroundColor: '#0D9488',
    paddingVertical: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  checkStatusText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
  changeMethodButton: {
    backgroundColor: '#CCFBF1',
    paddingVertical: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  changeMethodText: {
    color: '#0D9488',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
});
