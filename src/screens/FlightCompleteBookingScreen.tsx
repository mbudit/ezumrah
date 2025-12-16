import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronRight,
  User,
  Minus,
  Plus,
  X,
  ChevronDown,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing } from '../theme/theme';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useProfile } from '../hooks/useProfile';
import { useFlightBooking } from '../hooks/useFlightBooking';
import { useEffect } from 'react';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'FlightCompleteBooking'
>;

export const FlightCompleteBookingScreen = ({ navigation, route }: Props) => {
  const { flight, ticket } = route.params || {};
  const { profile } = useProfile();
  const { createBooking, isLoading } = useFlightBooking();

  const [sameAsContact, setSameAsContact] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Pre-fill contact details from profile
  useEffect(() => {
    if (profile) {
      setContactName(profile.name || '');
      setContactEmail(profile.email || '');
      setContactPhone(profile.phone || '');
    }
  }, [profile]);

  const handleCompleteBooking = async () => {
    // Generate passenger data from form
    const passengers = Array.from({ length: passengerCount }, (_, i) => ({
      id: `passenger-${i + 1}`,
      title: 'Mr',
      firstName: contactName.split(' ')[0] || '',
      lastName: contactName.split(' ').slice(1).join(' ') || '',
    }));

    const contact = {
      fullName: contactName,
      phone: contactPhone,
      email: contactEmail,
    };

    const booking = await createBooking(flight, ticket, passengers, contact);

    if (booking) {
      // Navigate to payment or confirmation
      navigation.navigate('PaymentInstruction', {
        orderId: booking.id,
      });
    }
  };

  const renderContactModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={contactModalVisible}
      onRequestClose={() => setContactModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setContactModalVisible(false)}>
              <X color="#333" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Contact Details</Text>
            <TouchableOpacity>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>
            The contact details will be used to send the e-ticket and for
            refund/reschedule reuqest
          </Text>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.helperText}>
                Filled based on ID/passport (without punctuation and title)
              </Text>
            </View>

            <View style={styles.phoneInputContainer}>
              <View style={styles.countrySelector}>
                <Image
                  source={{
                    uri: 'https://flagcdn.com/w40/my.png',
                  }}
                  style={styles.flagIcon}
                />
                <ChevronDown size={16} color="#333" />
              </View>
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.phoneLabel}>Phone number</Text>
                <TextInput
                  style={styles.phoneInput}
                  defaultValue="+60"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.phoneInputContainer}>
              <View style={styles.countrySelector}>
                <Image
                  source={{
                    uri: 'https://flagcdn.com/w40/my.png',
                  }}
                  style={styles.flagIcon}
                />
                <ChevronDown size={16} color="#333" />
              </View>
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.phoneLabel}>Phone number</Text>
                <TextInput
                  style={styles.phoneInput}
                  defaultValue="+60"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            <Text style={styles.helperText}>Emergency Contact</Text>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.requiredMark}>*</Text>
            </View>
            <Text style={styles.helperText}>
              E-ticket will be sent to this email
            </Text>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setContactModalVisible(false)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Complete Your Booking</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Flight Info Card */}
        <View style={styles.card}>
          <View style={styles.departRow}>
            <View style={styles.departTag}>
              <Text style={styles.departTagText}>Depart</Text>
            </View>
            <Text style={styles.departDate}>Thu, 02 Oct 2025 · 06:45</Text>
            <ChevronRight
              size={20}
              color={colors.primary}
              style={{ marginLeft: 'auto' }}
            />
            {/* Design shows chevron, implying expandable/details */}
          </View>

          <View style={styles.flightMainInfo}>
            <Image
              source={require('../assets/airlines/scoot.png')}
              style={styles.airlineLogo}
              resizeMode="contain"
            />
            <View style={styles.routeContainer}>
              <View style={styles.routeRow}>
                <Text style={styles.routeText}>Malaysia</Text>
                <ArrowLeft
                  size={16}
                  color="black"
                  style={{
                    transform: [{ rotate: '180deg' }],
                    marginHorizontal: 8,
                  }}
                />
                <Text style={styles.routeText}>Singapore</Text>
              </View>
              <Text style={styles.flightSubDetails}>
                1h 10m · Direct · Economy
              </Text>
            </View>
          </View>

          <View style={styles.refundRow}>
            <Text style={styles.refundText}>Refundable</Text>
            <Text style={styles.refundSeparator}>·</Text>
            <Text style={styles.refundText}>Reschedule allowed</Text>
          </View>
        </View>

        {/* Contact Details */}
        <Text style={styles.sectionHeader}>Contact Details</Text>
        <View style={styles.cardNoPadding}>
          <LinearGradient
            colors={['#5C4710', '#A18122', '#D4AF37', '#F2D567', '#E9D286']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loggedInStrip}
          >
            <User size={16} color="black" fill="black" />
            <Text style={styles.loggedInText}>Logged in as Hasan Barsain</Text>
          </LinearGradient>
          <TouchableOpacity
            style={styles.contactContent}
            onPress={() => setContactModalVisible(true)}
          >
            <View>
              <View style={styles.fillContactRow}>
                <Text style={styles.fillContactTitle}>
                  Fill in contact details
                </Text>
                <Text style={styles.requiredAsterisk}>*</Text>
              </View>
              <Text style={styles.fillContactSub}>
                E-tickets will be sent to the person below
              </Text>
            </View>
            <ChevronRight size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Passenger Details */}
        <View style={styles.passengerHeaderRow}>
          <Text style={styles.sectionHeader}>Passenger Details</Text>
          <View style={styles.stepperContainer}>
            <TouchableOpacity style={styles.stepperButton}>
              <Minus size={16} color="black" />
            </TouchableOpacity>
            <Text style={styles.stepperValue}>{passengerCount}</Text>
            <TouchableOpacity style={styles.stepperButton}>
              <Plus size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Same as contact details</Text>
            <Switch
              value={sameAsContact}
              onValueChange={setSameAsContact}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={'white'}
            />
          </View>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.passengerRow}
            onPress={() =>
              navigation.navigate('PassengerDetail', { passengerCount })
            }
          >
            <View style={styles.fillContactRow}>
              <Text style={styles.passengerTitle}>Passenger 1 (Adult)</Text>
              <Text style={styles.requiredAsterisk}>*</Text>
            </View>
            <ChevronRight size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
      {renderContactModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: spacing.m,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingTop: spacing.s,
  },
  backButton: {
    padding: 4,
    marginRight: spacing.m,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'white',
  },
  scrollContent: {
    padding: spacing.m,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardNoPadding: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: spacing.l,
    overflow: 'hidden', // for the strip
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  // Flight Info Styles
  departRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  departTag: {
    backgroundColor: '#FEF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: spacing.s,
  },
  departTagText: {
    fontSize: 12,
    color: '#8A6F29',
    fontWeight: 'bold',
  },
  departDate: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  flightMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  airlineLogo: {
    width: 32,
    height: 32,
    marginRight: spacing.m,
  },
  routeContainer: {
    flex: 1,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  routeText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  flightSubDetails: {
    fontSize: 12,
    color: '#666',
  },
  refundRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refundText: {
    fontSize: 12,
    color: '#10B981', // Green for success/allowed
  },
  refundSeparator: {
    marginHorizontal: 4,
    color: '#10B981',
  },

  // Contact Details
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.s,
  },
  loggedInStrip: {
    padding: spacing.s,
    paddingHorizontal: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  loggedInText: {
    fontSize: 12,
    color: '#222',
    fontFamily: 'Inter_18pt-Medium',
    marginLeft: spacing.s,
  },
  contactContent: {
    padding: spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fillContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fillContactTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: colors.primary,
  },
  requiredAsterisk: {
    color: 'red',
    marginLeft: 2,
  },
  fillContactSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  // Passenger Details
  passengerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  stepperButton: {
    padding: 4,
    width: 28,
    alignItems: 'center',
  },
  stepperValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.s,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: spacing.s,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  passengerTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: colors.primary,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.m,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  resetText: {
    fontSize: 14,
    color: '#0D9488',
    fontFamily: 'Inter_18pt-Medium',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: spacing.l,
    lineHeight: 18,
  },
  modalContent: {
    flexGrow: 0,
  },
  inputGroup: {
    marginBottom: spacing.s,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: spacing.m,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter_18pt-Regular',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: spacing.m,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: spacing.s,
    height: 56,
  },
  countrySelector: {
    width: 80,
    backgroundColor: '#EEF2FF', // slightly distinct background for selector
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  flagIcon: {
    width: 24,
    height: 16,
    borderRadius: 2,
  },
  phoneInputWrapper: {
    flex: 1,
    paddingHorizontal: spacing.m,
    justifyContent: 'center',
  },
  phoneLabel: {
    fontSize: 10,
    color: '#666',
  },
  phoneInput: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter_18pt-Bold',
    padding: 0,
    height: 20,
  },
  requiredMark: {
    position: 'absolute',
    right: 12,
    top: 18,
    color: 'red',
  },
  saveButton: {
    backgroundColor: '#0D9488',
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 16,
  },
});
