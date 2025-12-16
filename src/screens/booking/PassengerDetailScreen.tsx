import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Circle,
  Check,
  CheckSquare,
  Square,
  CloudUpload,
  ChevronUp,
  X,
  Camera,
  Image as ImageIcon,
} from 'lucide-react-native';
import { Modal } from 'react-native';
import { colors, spacing } from '../../theme/theme';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useBooking } from '../../hooks/useBooking';
import { Passenger } from '../../types/booking';
import { SelectionModal } from '../../components/SelectionModal';
import { DatePickerModal } from '../../components/DatePickerModal';
import { useReferenceData } from '../../hooks/useReferenceData';

type Props = NativeStackScreenProps<RootStackParamList, 'PassengerDetail'>;

export const PassengerDetailScreen = ({ navigation, route }: Props) => {
  const passengerNumber = route.params?.passengerNumber || 1;
  const passengerIndex = passengerNumber - 1;

  const {
    bookingState,
    updatePassenger,
    setPaymentType,
    uploadPassengerDocument,
  } = useBooking('1');
  const passenger = bookingState.passengers[passengerIndex];

  // Local state for form fields to avoid excessive re-renders/lag
  const [localPassenger, setLocalPassenger] = useState<Partial<Passenger>>({});

  useEffect(() => {
    if (passenger) {
      setLocalPassenger(passenger);
    }
  }, [passenger]);

  // Sync back to context on blur or specific actions
  const syncToGlobal = (updates: Partial<Passenger>) => {
    if (passenger) {
      updatePassenger(passenger.id, updates);
    }
  };

  const handleTextChange = (field: keyof Passenger, value: string) => {
    setLocalPassenger(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof Passenger) => {
    if (localPassenger[field] !== undefined) {
      syncToGlobal({ [field]: localPassenger[field] as any });
    }
  };

  // Immediate update for toggles
  const handleToggleSingleName = () => {
    const newValue = !localPassenger.singleName;
    setLocalPassenger(prev => ({ ...prev, singleName: newValue }));
    syncToGlobal({ singleName: newValue });
  };

  const handleTitleSelect = (title: string) => {
    setLocalPassenger(prev => ({ ...prev, title }));
    syncToGlobal({ title });
  };

  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [showPriceDetail, setShowPriceDetail] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  const [uploadType, setUploadType] = useState<'passport' | 'photo'>(
    'passport',
  );

  const { jobs, nationalities, genders } = useReferenceData();

  // Modal visibility states
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showNationalityModal, setShowNationalityModal] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateType, setActiveDateType] = useState<
    'birthDate' | 'passportPublicationDate' | 'passportExpiry' | null
  >(null);

  const handleSelection = (field: keyof Passenger, value: string) => {
    setLocalPassenger(prev => ({ ...prev, [field]: value }));
    syncToGlobal({ [field]: value as any });
  };

  const openDatePicker = (
    type: 'birthDate' | 'passportPublicationDate' | 'passportExpiry',
  ) => {
    setActiveDateType(type);
    setShowDatePicker(true);
  };

  const handleDateSelect = (date: string) => {
    if (activeDateType) {
      handleSelection(activeDateType, date);
    }
  };

  const handleUpload = (source: 'camera' | 'gallery') => {
    // Mock File Selection
    const mockUri =
      source === 'camera'
        ? 'file:///mock/camera/image.jpg'
        : 'file:///mock/gallery/image.jpg';

    if (passenger) {
      uploadPassengerDocument(passenger.id, uploadType, mockUri);
    }
    setShowUploadOptions(false);
  };

  if (!passenger) {
    return (
      <View style={styles.container}>
        <Text>Passenger not found</Text>
      </View>
    );
  }

  const renderUploadOptionsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showUploadOptions}
      onRequestClose={() => setShowUploadOptions(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.uploadModalContainer}>
          <View style={styles.uploadModalHeader}>
            <TouchableOpacity onPress={() => setShowUploadOptions(false)}>
              <X color="#333" size={24} />
            </TouchableOpacity>
            <Text style={styles.uploadModalTitle}>
              {uploadType === 'passport'
                ? 'Upload Passport Scan'
                : 'Upload Passport Size Photo'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.uploadOptionRow}
            onPress={() => handleUpload('camera')}
          >
            <Camera color="black" size={24} />
            <Text style={styles.uploadOptionText}>Scan</Text>
          </TouchableOpacity>

          <View style={{ height: spacing.m }} />

          <TouchableOpacity
            style={styles.uploadOptionRow}
            onPress={() => handleUpload('gallery')}
          >
            <ImageIcon color="black" size={24} />
            <Text style={styles.uploadOptionText}>Upload from gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
              {(bookingState.priceBreakdown?.basePrice || 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
          </View>

          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>Discount</Text>
            <Text style={[styles.priceDetailValue, { color: '#10B981' }]}>
              -$
              {(bookingState.priceBreakdown?.discount || 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
          </View>

          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>Tax</Text>
            <Text style={[styles.priceDetailValue, { color: '#10B981' }]}>
              {bookingState.priceBreakdown?.taxIncluded ? 'Included' : '$0'}
            </Text>
          </View>

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

  const renderRadioButton = (label: string) => (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={() => handleTitleSelect(label)}
    >
      <View
        style={[
          styles.radioCircle,
          localPassenger.title === label && styles.radioCircleSelected,
        ]}
      >
        {localPassenger.title === label && (
          <View style={styles.radioInnerCircle} />
        )}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Passenger Details {passengerNumber}
        </Text>
        <TouchableOpacity>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionHeader}>Passenger Information</Text>

        <Text style={styles.label}>Title</Text>
        <View style={styles.radioGroup}>
          {renderRadioButton('Mr')}
          {renderRadioButton('Mrs')}
          {renderRadioButton('Ms')}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Given Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First & Middle Name"
            placeholderTextColor="#9CA3AF"
            value={localPassenger.givenName}
            onChangeText={text => handleTextChange('givenName', text)}
            onBlur={() => handleBlur('givenName')}
          />
          <Text style={styles.helperText}>
            Filled based on ID/passport (without punctuation and title)
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handleToggleSingleName}
        >
          <View
            style={[
              styles.checkbox,
              localPassenger.singleName && styles.checkboxSelected,
            ]}
          >
            {localPassenger.singleName && <Check size={14} color="white" />}
          </View>
          <Text style={styles.checkboxLabel}>
            Passenger only have a single name
          </Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Surname</Text>
          <TextInput
            style={styles.input}
            placeholder="Family / Last Name"
            placeholderTextColor="#9CA3AF"
            value={localPassenger.surname}
            onChangeText={text => handleTextChange('surname', text)}
            onBlur={() => handleBlur('surname')}
            editable={!localPassenger.singleName}
          />
          <Text style={styles.helperText}>
            Filled based on ID/passport (without punctuation and title)
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of birth</Text>
          <TouchableOpacity onPress={() => openDatePicker('birthDate')}>
            <View style={styles.inputIconContainer}>
              <Text
                style={[
                  styles.input,
                  styles.inputWithIcon,
                  !localPassenger.birthDate && { color: '#9CA3AF' },
                ]}
              >
                {localPassenger.birthDate || 'Date of birth'}
              </Text>
              <Calendar size={20} color="#0D9488" style={styles.inputIcon} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity onPress={() => setShowGenderModal(true)}>
            <View style={styles.inputIconContainer}>
              <Text
                style={[
                  styles.input,
                  styles.inputWithIcon,
                  !localPassenger.gender && { color: '#9CA3AF' },
                ]}
              >
                {localPassenger.gender || 'Gender'}
              </Text>
              <ChevronDown size={20} color="#0D9488" style={styles.inputIcon} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job</Text>
          <TouchableOpacity onPress={() => setShowJobModal(true)}>
            <View style={styles.inputIconContainer}>
              <Text
                style={[
                  styles.input,
                  styles.inputWithIcon,
                  !localPassenger.job && { color: '#9CA3AF' },
                ]}
              >
                {localPassenger.job || 'Job'}
              </Text>
              <ChevronDown size={20} color="#0D9488" style={styles.inputIcon} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={localPassenger.phoneNumber}
            onChangeText={text => handleTextChange('phoneNumber', text)}
            onBlur={() => handleBlur('phoneNumber')}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nationality</Text>
          <TouchableOpacity onPress={() => setShowNationalityModal(true)}>
            <View style={styles.inputIconContainer}>
              <Text
                style={[
                  styles.input,
                  styles.inputWithIcon,
                  !localPassenger.nationality && { color: '#9CA3AF' },
                ]}
              >
                {localPassenger.nationality || 'Nationality'}
              </Text>
              <ChevronDown size={20} color="#0D9488" style={styles.inputIcon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.helperText}>
            Please make sure your passport is still valid min. 6 months after
            departure date
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>Passenger Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Passport Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Passport Number"
            placeholderTextColor="#9CA3AF"
            value={localPassenger.passportNumber}
            onChangeText={text => handleTextChange('passportNumber', text)}
            onBlur={() => handleBlur('passportNumber')}
          />
          <Text style={styles.helperText}>
            Valid at least 6 months before departure
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Publication Date</Text>
          <TouchableOpacity
            onPress={() => openDatePicker('passportPublicationDate')}
          >
            <View style={styles.inputIconContainer}>
              <Text
                style={[
                  styles.input,
                  styles.inputWithIcon,
                  !localPassenger.passportPublicationDate && {
                    color: '#9CA3AF',
                  },
                ]}
              >
                {localPassenger.passportPublicationDate || 'Publication Date'}
              </Text>
              <Calendar size={20} color="#0D9488" style={styles.inputIcon} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Expiry Date</Text>
          <TouchableOpacity onPress={() => openDatePicker('passportExpiry')}>
            <View style={styles.inputIconContainer}>
              <Text
                style={[
                  styles.input,
                  styles.inputWithIcon,
                  !localPassenger.passportExpiry && { color: '#9CA3AF' },
                ]}
              >
                {localPassenger.passportExpiry || 'Expiry Date'}
              </Text>
              <Calendar size={20} color="#0D9488" style={styles.inputIcon} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Upload Passport Scan</Text>
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={() => {
            setUploadType('passport');
            setShowUploadOptions(true);
          }}
        >
          <View style={styles.uploadContent}>
            <CloudUpload
              size={32}
              color="#374151"
              style={{ marginBottom: 8 }}
            />
            {passenger.passportScan ? (
              <Text style={[styles.uploadTitle, { color: '#0D9488' }]}>
                Document Uploaded
              </Text>
            ) : (
              <Text style={styles.uploadTitle}>Choose a file or scan</Text>
            )}
            <Text style={styles.uploadSubtitle}>
              JPEG, PNG, PDG, and MP4 formats, up to 10MB
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: spacing.m }} />

        <Text style={styles.label}>Upload Passport Size Photo</Text>
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={() => {
            setUploadType('photo');
            setShowUploadOptions(true);
          }}
        >
          <View style={styles.uploadContent}>
            <CloudUpload
              size={32}
              color="#374151"
              style={{ marginBottom: 8 }}
            />
            {passenger.photo ? (
              <Text style={[styles.uploadTitle, { color: '#0D9488' }]}>
                Photo Uploaded
              </Text>
            ) : (
              <Text style={styles.uploadTitle}>Choose a file or scan</Text>
            )}
            <Text style={styles.uploadSubtitle}>
              JPEG, PNG, PDG, and MP4 formats, up to 10MB
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceToggleRow}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', zIndex: 10 }}
          >
            <Text style={styles.showPricesText}>Show Prices as a </Text>
            <View>
              <TouchableOpacity
                style={styles.fullPaymentBadge}
                onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}
              >
                <Text style={styles.fullPaymentText}>
                  {bookingState.paymentType === 'Full'
                    ? 'Full Payment'
                    : 'Deposit'}
                </Text>
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
          <View pointerEvents="none">
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={'#f4f3f4'}
              value={false}
            />
          </View>
        </View>
        <View style={styles.dividerFull} />

        <View style={styles.totalPaymentRow}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              onPress={() => setShowPriceDetail(true)}
            >
              <Text style={styles.totalPrice}>
                $
                {bookingState.totalPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
              <ChevronUp size={16} color="black" />
            </TouchableOpacity>
            <Text style={styles.totalLabel}>
              Total payment for {bookingState.passengers.length} persons
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('TripEnhance')}
        >
          <Text style={styles.continueButtonText}>Continue to Add-ons</Text>
        </TouchableOpacity>
      </View>
      {renderPriceDetailModal()}
      {renderUploadOptionsModal()}

      <SelectionModal
        visible={showGenderModal}
        onClose={() => setShowGenderModal(false)}
        title="Select Gender"
        options={genders}
        onSelect={val => handleSelection('gender', val)}
        selectedValue={localPassenger.gender}
      />

      <SelectionModal
        visible={showJobModal}
        onClose={() => setShowJobModal(false)}
        title="Select Job"
        options={jobs}
        onSelect={val => handleSelection('job', val)}
        selectedValue={localPassenger.job}
      />

      <SelectionModal
        visible={showNationalityModal}
        onClose={() => setShowNationalityModal(false)}
        title="Select Nationality"
        options={nationalities}
        onSelect={val => handleSelection('nationality', val)}
        selectedValue={localPassenger.nationality}
      />

      <DatePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        title="Select Date"
        onSelect={handleDateSelect}
        initialDate={
          activeDateType
            ? (localPassenger[activeDateType] as string)
            : undefined
        }
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
    justifyContent: 'space-between',
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  resetText: {
    fontSize: 14,
    color: '#0D9488',
    fontFamily: 'Inter_18pt-Medium',
  },
  content: {
    padding: spacing.m,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.l,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold', // Bolder label
    color: '#333',
    marginBottom: spacing.s,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: spacing.l,
    marginBottom: spacing.l,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#0D9488',
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0D9488',
  },
  radioLabel: {
    fontSize: 14,
    color: 'black',
  },
  inputGroup: {
    marginBottom: spacing.m,
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
  inputWithIcon: {
    paddingRight: 40,
  },
  inputIconContainer: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    right: spacing.m,
    top: 14, // Approx center vertical
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -spacing.s, // Pull up closer to previous input helper
    marginBottom: spacing.m,
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#0D9488',
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: spacing.l,
  },
  dividerFull: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: -spacing.m,
    marginBottom: spacing.m,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#374151',
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  footer: {
    padding: spacing.m,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  priceToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  showPricesText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    color: '#333',
  },
  fullPaymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 4,
    gap: 4,
  },
  fullPaymentText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
    color: '#D97706',
  },
  totalPaymentRow: {
    marginBottom: spacing.m,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  totalLabel: {
    fontSize: 12,
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#0D9488',
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 16,
  },
  paymentDropdown: {
    position: 'absolute',
    bottom: '100%',
    left: 4,
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
  dropdownText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
    color: '#333',
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
    color: 'black',
  },
  modalTotalValue: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  uploadModalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.m,
    paddingBottom: spacing.xl + 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  uploadModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l,
    gap: 12,
  },
  uploadModalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  uploadOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  uploadOptionText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter_18pt-Medium',
  },
});
