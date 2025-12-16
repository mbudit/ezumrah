import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Info,
  User,
  Plus,
  Minus,
  ChevronRight,
  X,
  ChevronDown,
  ArrowRight,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { Modal } from 'react-native';

const { width } = Dimensions.get('window');

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

import { useBooking } from '../hooks/useBooking';
import { ActivityIndicator } from 'react-native';

export const BookingScreen = ({ navigation }: Props) => {
  const { bookingState, isLoading, addPassenger, removePassenger } =
    useBooking('1'); // Mock ID

  const [isSameAsContact, setIsSameAsContact] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  if (isLoading || !bookingState.packageInfo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const { packageInfo, passengers, contactDetails } = bookingState;

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
                defaultValue={contactDetails.fullName}
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
                  defaultValue={contactDetails.phoneNumber} // Mock prepopulated
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
                defaultValue={contactDetails.email}
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

  const renderFlightCard = () => (
    <View style={styles.flightCard}>
      <View style={styles.flightCardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={packageInfo.airlineLogo}
            style={{
              width: 24,
              height: 24,
              marginRight: 8,
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.flightDate}>{packageInfo.startDate}</Text>
        </View>
        <View style={styles.departBadge}>
          <Text style={styles.departText}>Depart</Text>
        </View>
      </View>

      <View style={styles.airlineRow}>
        <Image source={packageInfo.airlineLogo} style={styles.airlineLogo} />
        <Text style={styles.verifiedText}>verified</Text>
        <View style={styles.verifiedIcon} />
      </View>

      <View style={styles.routeRow}>
        <Text style={styles.routeCode}>
          {packageInfo.startLocation.split('(')[1].replace(')', '')}
        </Text>
        <ArrowRight size={16} color="black" />
        <Text style={styles.routeCode}>
          {packageInfo.endLocation.split('(')[1].replace(')', '')}
        </Text>
      </View>

      <Text style={styles.flightTime}>15:50 - 21:45</Text>
      <Text style={styles.flightClass}>Business Class</Text>

      <View style={styles.cardFooter}>
        <View style={styles.infoRow}>
          <Info size={14} color="#555" style={{ marginRight: 4 }} />
          <Text style={styles.infoText}>Non-refundable</Text>
        </View>
        <View style={styles.infoRow}>
          <Info size={14} color="#555" style={{ marginRight: 4 }} />
          <Text style={styles.infoText}>Reschedule not available</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#F3F4F6' }}
        edges={['bottom', 'left', 'right']}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete Your Booking</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.topSectionContainer}>
            <Text style={styles.vendorText}>Vendor: Ezumrah.com</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flightScroll}
              contentContainerStyle={styles.flightScrollContent}
            >
              {renderFlightCard()}
              <View style={{ width: 16 }} />
              {/* Only render one card for now unless we structure multiple flights */}
              {/* {renderFlightCard()} */}
            </ScrollView>
          </View>

          <View style={styles.remainingContent}>
            <Text style={styles.sectionTitle}>Contact Details</Text>
            <View style={styles.contactCard}>
              <LinearGradient
                colors={['#20A39E', '#93E0DE', '#BCE7E6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientHeader}
              >
                <User size={16} color="black" />
                <Text style={styles.loggedInText}>
                  Logged in as {contactDetails.fullName}
                </Text>
              </LinearGradient>
              <View style={styles.contactContent}>
                <TouchableOpacity
                  style={styles.fillContactRow}
                  onPress={() => setContactModalVisible(true)}
                >
                  <Text style={styles.fillContactText}>
                    Fill in contact details*
                  </Text>
                  <ChevronRight size={20} color="#0D9488" />
                </TouchableOpacity>
                <Text style={styles.eticketNote}>
                  E-tickets will be sent to the person below
                </Text>
              </View>
            </View>

            <View style={styles.passengerHeaderRow}>
              <Text style={styles.sectionTitle}>Passenger Details</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() =>
                    removePassenger(passengers[passengers.length - 1]?.id)
                  }
                  disabled={passengers.length <= 1}
                >
                  <Minus
                    size={16}
                    color={passengers.length <= 1 ? '#ccc' : '#555'}
                  />
                </TouchableOpacity>
                <Text style={styles.counterText}>{passengers.length}</Text>
                <TouchableOpacity onPress={addPassenger}>
                  <Plus size={16} color="#555" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.passengerCard}>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Same as contact details</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isSameAsContact ? '#0D9488' : '#f4f3f4'}
                  onValueChange={setIsSameAsContact}
                  value={isSameAsContact}
                />
              </View>
              <View style={styles.divider} />

              {passengers.map((passenger, index) => (
                <View key={passenger.id}>
                  <TouchableOpacity
                    style={styles.passengerRow}
                    onPress={() =>
                      navigation.navigate('PassengerDetail', {
                        passengerCount: index + 1,
                      })
                    }
                  >
                    <Text style={styles.passengerLabel}>
                      Passenger {index + 1} ({passenger.type})
                      <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <ChevronRight size={20} color="#0D9488" />
                  </TouchableOpacity>
                  {index < passengers.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {renderContactModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D9488',
  },
  header: {
    backgroundColor: '#0D9488', // Teal
    padding: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.m,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'white',
  },
  content: {
    padding: 0, // Remove default padding since we have custom sections
    paddingBottom: spacing.xl,
  },
  topSectionContainer: {
    backgroundColor: '#0D9488', // Teal background container
    padding: spacing.m,
    paddingTop: 0,
    marginBottom: spacing.m,
    paddingBottom: spacing.l + 30, // Extra padding at bottom for overlap look if needed, or just enough
  },
  vendorText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'white',
    marginBottom: spacing.m,
  },
  flightScroll: {
    marginBottom: -30, // Pull up or just standard
  },
  flightScrollContent: {
    // paddingRight: spacing.m,
  },
  flightCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    width: width * 0.7,
    marginRight: spacing.s,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  flightDate: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#333',
  },
  departBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  departText: {
    fontSize: 12,
    color: '#D97706',
    fontFamily: 'Inter_18pt-Medium',
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  airlineLogo: {
    width: 105,
    height: 25,
    resizeMode: 'contain',
    marginRight: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#65a30d', // lime-600
    marginRight: 2,
  },
  verifiedIcon: {
    width: 10,
    height: 10,
    backgroundColor: '#65a30d',
    borderRadius: 5,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 8,
  },
  routeCode: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  flightTime: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  flightClass: {
    fontSize: 12,
    color: '#555',
    marginBottom: spacing.m,
  },
  cardFooter: {
    backgroundColor: '#FFF7ED', // Orange-50 ?
    marginHorizontal: -spacing.m,
    marginBottom: -spacing.m,
    padding: spacing.m,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.s,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: spacing.l,
    overflow: 'hidden', // Ensure gradient respects border radius
  },
  gradientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.s, // Increased padding to match image
    gap: 8,
  },
  contactContent: {
    padding: spacing.m,
  },
  loggedInText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-SemiBold', // Bolder font
    color: 'black',
  },
  fillContactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  fillContactText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#0D9488',
  },
  eticketNote: {
    fontSize: 12,
    color: '#666',
  },
  passengerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0D9488',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 12,
  },
  counterText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  passengerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.m,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.s,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: spacing.s,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  passengerLabel: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#0D9488',
  },
  remainingContent: {
    paddingHorizontal: spacing.m,
  },
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
    // flex: 1, // caused collapse inside auto-height container
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
