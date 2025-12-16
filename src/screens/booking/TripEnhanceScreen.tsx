import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Briefcase,
  Plane,
  ShieldCheck,
  PlusCircle,
  Luggage,
  Clock,
  Coins,
  Shield,
  Percent,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react-native';
import { Switch, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing } from '../../theme/theme';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useBooking } from '../../hooks/useBooking';
import { useTripEnhancements } from '../../hooks/useTripEnhancements';
import { Enhancement } from '../../types/enhancement';

// Lucide Icon Mapping
const ICON_MAP: Record<string, any> = {
  Luggage,
  Plane,
  ShieldCheck,
  Shield,
  Coins,
  Clock,
  Briefcase,
};

type Props = NativeStackScreenProps<RootStackParamList, 'TripEnhance'>;

export const TripEnhanceScreen = ({ navigation }: Props) => {
  const {
    bookingState,
    setPaymentType,
    toggleEnhancement,
    calculateTotalPrice,
  } = useBooking('1');
  const { enhancements, isLoading } = useTripEnhancements();

  const [showPaymentDropdown, setShowPaymentDropdown] = React.useState(false);
  const [showPriceDetail, setShowPriceDetail] = React.useState(false);

  // Calculate enhancement total for display and sync
  const enhancementTotal = React.useMemo(() => {
    return enhancements.reduce((total, item) => {
      const qty = bookingState.selectedEnhancements[item.id] || 0;
      return total + qty * item.price;
    }, 0);
  }, [enhancements, bookingState.selectedEnhancements]);

  // Sync total price to global state when it changes
  React.useEffect(() => {
    calculateTotalPrice(enhancementTotal);
  }, [enhancementTotal]);

  const handleToggleEnhancement = (item: Enhancement) => {
    const currentQty = bookingState.selectedEnhancements[item.id] || 0;
    const newQty = currentQty > 0 ? 0 : 1; // Toggle logic for now (0 or 1)
    toggleEnhancement(item.id, newQty, item.price);
  };

  const renderEnhancementCard = (item: Enhancement) => {
    const Icon = ICON_MAP[item.iconName] || Shield;
    const isSelected = (bookingState.selectedEnhancements[item.id] || 0) > 0;

    return (
      <View
        key={item.id}
        style={[styles.card, isSelected && styles.cardSelected]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Icon
              color={item.category === 'add-on' ? '#D97706' : '#0D9488'}
              size={20}
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>

        {item.benefits && (
          <View style={styles.benefitContainer}>
            {item.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitRow}>
                <ShieldCheck color="#0D9488" size={16} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            <Text style={styles.priceValue}>
              IDR {item.price.toLocaleString('id-ID')}
            </Text>
            {item.unit}
          </Text>
          <TouchableOpacity onPress={() => handleToggleEnhancement(item)}>
            {isSelected ? (
              <View style={styles.selectedIcon}>
                <ShieldCheck color="white" size={16} />
              </View>
            ) : (
              <PlusCircle color="#0D9488" size={24} fill="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Helper for payment label
  const paymentLabel =
    bookingState.paymentType === 'Full' ? 'Full Payment' : 'Deposit';

  const renderPriceDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPriceDetail}
      onRequestClose={() => setShowPriceDetail(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.priceModalContainer}>
          <View style={styles.priceModalHeader}>
            <TouchableOpacity onPress={() => setShowPriceDetail(false)}>
              <X color="#333" size={24} />
            </TouchableOpacity>
            <Text style={styles.priceModalTitle}>Price Detail</Text>
            <View style={{ width: 24 }} />
          </View>

          <Text style={styles.packageName}>
            {bookingState.packageInfo?.title}
          </Text>

          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>
              {bookingState.passengers.length} Passengers
            </Text>
            <Text style={styles.priceDetailValue}>
              $
              {bookingState.priceBreakdown.basePrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
          </View>

          {enhancements.map(item => {
            const qty = bookingState.selectedEnhancements[item.id] || 0;
            if (qty === 0) return null;
            return (
              <View key={item.id} style={styles.priceDetailRow}>
                <Text style={styles.priceDetailLabel}>{item.title}</Text>
                <Text style={styles.priceDetailValue}>
                  + IDR {(item.price * qty).toLocaleString('id-ID')}
                </Text>
              </View>
            );
          })}

          <View style={styles.modalDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.modalTotalLabel}>TOTAL</Text>
            <Text style={styles.modalTotalValue}>
              $
              {bookingState.totalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
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
        <Text style={styles.headerTitle}>Enhance your trip</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Gold Banner */}
        <LinearGradient
          colors={['#7E5E04', '#DDB95B', '#7E5E04']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.banner}
        >
          <Text style={styles.bannerText}>Last stop to enhance your trip!</Text>
        </LinearGradient>

        {/* Travel Add-ons */}
        <Text style={styles.sectionTitle}>Travel Add-ons</Text>
        {enhancements
          .filter(e => e.category === 'add-on')
          .map(renderEnhancementCard)}

        {/* Extra Protection */}
        <Text style={styles.sectionTitle}>Extra Protection</Text>
        {enhancements
          .filter(e => e.category !== 'add-on')
          .map(renderEnhancementCard)}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <View style={styles.promoIconContainer}>
              <Percent size={16} color="white" />
            </View>
            <Text style={styles.promoText}>Save more with the best promo</Text>
          </View>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => navigation.navigate('PromoCode')}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Toggle Row */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleLabelContainer}>
            <Text style={styles.toggleLabel}>Show Prices as a</Text>
            <View>
              <TouchableOpacity
                style={styles.dropdownBadge}
                onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}
              >
                <Text style={styles.dropdownText}>{paymentLabel}</Text>
                <ChevronDown size={14} color="#D97706" />
              </TouchableOpacity>
              {showPaymentDropdown && (
                <View style={styles.paymentDropdown}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setPaymentType('Full');
                      setShowPaymentDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>Full Payment</Text>
                  </TouchableOpacity>
                  <View style={styles.dropdownDivider} />
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setPaymentType('Deposit');
                      setShowPaymentDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>Deposit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <Switch
            trackColor={{ false: '#E5E7EB', true: '#0D9488' }}
            thumbColor={'white'}
            ios_backgroundColor="#E5E7EB"
            onValueChange={val => setPaymentType(val ? 'Full' : 'Deposit')}
            value={bookingState.paymentType === 'Full'}
          />
        </View>

        <View style={styles.divider} />

        {/* Total & Action */}
        <View style={styles.totalSection}>
          <View>
            <TouchableOpacity
              style={styles.totalPriceRow}
              onPress={() => setShowPriceDetail(true)}
            >
              <Text style={styles.totalPrice}>
                $
                {bookingState.totalPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
              <ChevronUp size={20} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.totalSubtitle}>
              Total payment for 2 persons
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('OrderProcessing')}
        >
          <Text style={styles.continueButtonText}>Continue to Payment</Text>
        </TouchableOpacity>
      </View>
      {renderPriceDetailModal()}
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
    backgroundColor: '#FAFAFA',
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
  content: {
    padding: spacing.m,
  },
  banner: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    borderRadius: 20,
    marginBottom: spacing.l,
    alignSelf: 'flex-start', // Fit content
  },
  bannerText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.m,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardSelected: {
    borderColor: '#0D9488',
    backgroundColor: '#F0FDFA',
  },
  cardHeader: {
    marginBottom: spacing.m,
  },
  selectedIcon: {
    backgroundColor: '#0D9488',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    marginTop: 2,
  },
  cardDescription: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
    fontFamily: 'Inter_18pt-Regular',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    marginHorizontal: -spacing.m,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    marginBottom: -spacing.m,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  priceValue: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    color: '#0D9488',
  },
  priceUnit: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#333',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.m,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  benefitContainer: {
    backgroundColor: '#F0FDFA',
    padding: spacing.m,
    borderRadius: 8,
    marginBottom: spacing.m,
  },
  benefitRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  benefitText: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  boldText: {
    fontFamily: 'Inter_18pt-Bold',
  },
  moreBenefitText: {
    fontSize: 12,
    color: '#0D9488',
    textDecorationLine: 'underline',
    fontFamily: 'Inter_18pt-Medium',
    marginLeft: 24, // Align with text
  },
  footer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: spacing.l, // Add logic for safe area if needed, but safeview handles edges
  },
  promoBanner: {
    backgroundColor: '#FFFBEB',
    padding: spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  promoIconContainer: {
    backgroundColor: '#0D9488',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  applyButton: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  applyButtonText: {
    fontSize: 12,
    color: '#0D9488',
    fontFamily: 'Inter_18pt-SemiBold',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.m,
  },
  toggleLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_18pt-Regular',
  },
  dropdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  dropdownText: {
    fontSize: 12,
    color: '#D97706', // amber-600
    fontFamily: 'Inter_18pt-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: spacing.m,
  },
  totalSection: {
    padding: spacing.m,
  },
  totalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: '#0D9488',
  },
  totalSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: '#0D9488',
    margin: spacing.m,
    marginTop: 0,
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
  paymentDropdown: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 120,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  priceModalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.m,
    paddingBottom: spacing.xl,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  priceModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l,
    gap: 12,
  },
  priceModalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  packageName: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
    marginBottom: spacing.m,
  },
  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.s,
  },
  priceDetailLabel: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_18pt-Regular',
  },
  priceDetailValue: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: spacing.m,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTotalLabel: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: '#333',
  },
  modalTotalValue: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: '#0D9488',
  },
});
