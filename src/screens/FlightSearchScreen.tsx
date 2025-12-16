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
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Plane,
  Calendar,
  Users,
  Armchair,
  ArrowRight,
  Info,
  Copy,
  ChevronRight,
  X,
  MapPin,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing } from '../theme/theme';

const { width, height } = Dimensions.get('window');

const AIRPORTS = [
  { city: 'Jakarta', code: 'CGK', name: 'Bandara Soekarno-Hatta' },
  { city: 'Bali', code: 'DPS', name: 'Ngurah Rai International Airport' },
  { city: 'Surabaya', code: 'SUB', name: 'Juanda International Airport' },
  { city: 'Singapore', code: 'SIN', name: 'Changi Airport' },
  {
    city: 'Kuala Lumpur',
    code: 'KUL',
    name: 'Kuala Lumpur International Airport',
  },
  { city: 'Jeddah', code: 'JED', name: 'King Abdulaziz International Airport' },
  { city: 'Madinah', code: 'MED', name: 'Prince Mohammad Bin Abdulaziz' },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getFormattedDate = (date: Date) => {
  const day = DAYS[date.getDay()];
  const dd = date.getDate().toString().padStart(2, '0');
  const mon = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day}, ${dd} ${mon} ${year}`;
};

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push({
      id: i.toString(),
      dateObj: nextDate,
      formatted: getFormattedDate(nextDate),
    });
  }
  return dates;
};

const AVAILABLE_DATES = generateDates();

const SEAT_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First Class'];
const PASSENGER_OPTIONS = [
  '1 Passenger',
  '2 Passengers',
  '3 Passengers',
  '4 Passengers',
  '5 Passengers',
  '6 Passengers',
];

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useFlightSearch } from '../hooks/useFlightSearch';
import { FlightSearchParams } from '../types/flight';

type Props = NativeStackScreenProps<RootStackParamList, 'FlightSearch'>;

export const FlightSearchScreen = ({ navigation }: Props) => {
  const { searchFlights, isSearching } = useFlightSearch();

  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureCity, setDepartureCity] = useState(AIRPORTS[0]);
  const [arrivalCity, setArrivalCity] = useState(AIRPORTS[1]);
  const [date, setDate] = useState(AVAILABLE_DATES[0].formatted);
  const [passengers, setPassengers] = useState('1 Passenger');
  const [seatClass, setSeatClass] = useState('Economy');

  const [modalVisible, setModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [passengerModalVisible, setPassengerModalVisible] = useState(false);
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'from' | 'to'>('from');

  const handleSelectAirport = (airport: (typeof AIRPORTS)[0]) => {
    if (selectionMode === 'from') {
      setDepartureCity(airport);
    } else {
      setArrivalCity(airport);
    }
    setModalVisible(false);
  };

  const openSelection = (mode: 'from' | 'to') => {
    setSelectionMode(mode);
    setModalVisible(true);
  };

  const handleSearch = async () => {
    const passengerCount = parseInt(passengers.split(' ')[0]);

    const searchParams: FlightSearchParams = {
      from: departureCity.code,
      to: arrivalCity.code,
      departDate: date,
      passengers: passengerCount,
      seatClass: seatClass,
      isRoundTrip: isRoundTrip,
    };

    // Trigger search
    await searchFlights(searchParams);

    // Navigate to results
    navigation.navigate('FlightResults', { searchParams });
  };

  const renderInput = (
    label: string,
    value: string,
    icon: React.ReactNode,
    placeholder?: string,
    onPress?: () => void,
  ) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={styles.inputContainer}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.inputIcon}>{icon}</View>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          editable={false}
          onPressIn={onPress} // Ensure tap works even on TextInput area
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Banner */}
        <View style={styles.header}>
          <Image
            source={require('../assets/banner/flight.png')}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.headerOverlay}
          />
          <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <ArrowLeft color="black" size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Flight</Text>
          </SafeAreaView>
        </View>

        {/* Main Content Sheet - Integrated Form & Sections */}
        <View style={styles.mainContent}>
          {/* Form Fields */}
          <View style={styles.formSection}>
            {renderInput(
              'From',
              `${departureCity.city} (${departureCity.code})`,
              <Plane
                size={20}
                color="#555"
                style={{ transform: [{ rotate: '-45deg' }] }}
              />,
              undefined,
              () => openSelection('from'),
            )}

            <View style={{ height: spacing.m }} />

            {renderInput(
              'To',
              `${arrivalCity.city} (${arrivalCity.code})`,
              <Plane
                size={20}
                color="#555"
                style={{ transform: [{ rotate: '45deg' }] }}
              />,
              undefined,
              () => openSelection('to'),
            )}

            <View style={styles.separator} />

            {/* Date & Toggle */}
            <View style={styles.dateRow}>
              <View style={{ flex: 1 }}>
                {renderInput(
                  'Time',
                  date,
                  <Calendar size={20} color="#555" />,
                  undefined,
                  () => setDateModalVisible(true),
                )}
              </View>
              <View style={styles.roundTripToggle}>
                <Text style={styles.toggleLabel}>Roundtrip?</Text>
                <Switch
                  value={isRoundTrip}
                  onValueChange={setIsRoundTrip}
                  trackColor={{ false: '#767577', true: colors.primary }}
                  thumbColor={isRoundTrip ? 'white' : '#f4f3f4'}
                />
              </View>
            </View>

            <View style={{ height: spacing.m }} />

            {/* Passengers & Class */}
            <View style={styles.optionRow}>
              <View style={{ flex: 1, marginRight: spacing.s }}>
                {renderInput(
                  'Passengers',
                  passengers,
                  <Users size={20} color="#555" />,
                  undefined,
                  () => setPassengerModalVisible(true),
                )}
              </View>
              <View style={{ flex: 1, marginLeft: spacing.s }}>
                {renderInput(
                  'Seat Class',
                  seatClass,
                  <Armchair size={20} color="#555" />,
                  undefined,
                  () => setClassModalVisible(true),
                )}
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity
              style={[
                styles.searchButton,
                isSearching && styles.searchButtonDisabled,
              ]}
              onPress={handleSearch}
              disabled={isSearching}
            >
              <Text style={styles.searchButtonText}>
                {isSearching ? 'Searching...' : 'Search'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Vouchers */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hurry! Claim your voucher!</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginHorizontal: -spacing.m,
              }}
              contentContainerStyle={{
                paddingHorizontal: spacing.m,
                paddingBottom: spacing.m,
              }}
            >
              {[1, 2].map(i => (
                <View key={i} style={styles.voucherCard}>
                  <View style={styles.voucherIconBg}>
                    <Plane color="white" size={24} />
                  </View>
                  <View style={styles.voucherContent}>
                    <Text style={styles.voucherTextTitle}>
                      Cashback s/d 150K
                    </Text>
                    <Text style={styles.voucherTextSub}>
                      min. transaction IDR 3,500,000
                    </Text>
                    <View style={styles.voucherCodeRow}>
                      <View style={styles.codeBox}>
                        <Text style={styles.codeText}>GOFLIGHT</Text>
                        <Copy
                          size={14}
                          color="#555"
                          style={{ marginLeft: 4 }}
                        />
                      </View>
                      <TouchableOpacity style={styles.copyButton}>
                        <Text style={styles.copyButtonText}>Copy</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Info
                    size={16}
                    color="#999"
                    style={{ position: 'absolute', top: 12, right: 12 }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Budget-Friendly International Travel */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Budget-Friendly International Travel!
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginHorizontal: -spacing.m,
              }}
              contentContainerStyle={{
                paddingHorizontal: spacing.m,
                paddingBottom: spacing.m,
              }}
            >
              {[1, 2].map(i => (
                <View key={i} style={styles.promoCard}>
                  <Image
                    source={require('../assets/banner/umrah.png')} // Placeholder
                    style={styles.promoImage}
                  />
                  <View style={styles.promoLabel}>
                    <Text style={styles.promoLabelText}>One Way</Text>
                  </View>
                  <View style={styles.promoContent}>
                    <Text style={styles.promoTitle}>Malaysia to Singapore</Text>
                    <Text style={styles.promoDate}>14 Oktober 2026</Text>
                    <View style={styles.airlineRow}>
                      <View style={styles.airlineIcon} />
                      <Text style={styles.airlineName}>
                        Malaysia Airlines • Economy
                      </Text>
                    </View>
                    <Text style={styles.promoOriginalPrice}>IDR 519.000</Text>
                    <Text style={styles.promoPrice}>IDR 506,106</Text>
                    <Text style={styles.promoTax}>(Belum termasuk pajak)</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Important for You */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Important for You!</Text>
            {[
              'How to Refund Flight Ticket',
              'How to Reschedule Flight',
              'Promos for You',
            ].map((item, index) => (
              <View key={index}>
                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuIconPlaceholder} />
                  <Text style={styles.menuText}>{item}</Text>
                  <ChevronRight color="black" size={20} />
                </TouchableOpacity>
                {index < 2 && <View style={styles.menuSeparator} />}
              </View>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {/* Airport Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {selectionMode === 'from' ? 'Departure' : 'Arrival'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color="black" size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={AIRPORTS}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.airportItem}
                  onPress={() => handleSelectAirport(item)}
                >
                  <View style={styles.airportIconBg}>
                    <MapPin color="white" size={20} />
                  </View>
                  <View style={styles.airportItemContent}>
                    <Text style={styles.airportCity}>
                      {item.city} ({item.code})
                    </Text>
                    <Text style={styles.airportName}>{item.name}</Text>
                  </View>
                  {((selectionMode === 'from' &&
                    departureCity.code === item.code) ||
                    (selectionMode === 'to' &&
                      arrivalCity.code === item.code)) && (
                    <View style={styles.selectedDot} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Date Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateModalVisible}
        onRequestClose={() => setDateModalVisible(false)}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setDateModalVisible(false)}>
                <X color="black" size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={AVAILABLE_DATES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dateItemWrapper}
                  onPress={() => {
                    setDate(item.formatted);
                    setDateModalVisible(false);
                  }}
                >
                  <View style={styles.dateIconBg}>
                    <Calendar
                      color={date === item.formatted ? 'white' : colors.primary}
                      size={20}
                    />
                  </View>
                  <Text
                    style={[
                      styles.dateText,
                      date === item.formatted && {
                        color: colors.primary,
                        fontFamily: 'Inter_18pt-Bold',
                      },
                    ]}
                  >
                    {item.formatted}
                  </Text>
                  {date === item.formatted && (
                    <View style={styles.selectedDot} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Passenger Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={passengerModalVisible}
        onRequestClose={() => setPassengerModalVisible(false)}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Passengers</Text>
              <TouchableOpacity onPress={() => setPassengerModalVisible(false)}>
                <X color="black" size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={PASSENGER_OPTIONS}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItemWrapper}
                  onPress={() => {
                    setPassengers(item);
                    setPassengerModalVisible(false);
                  }}
                >
                  <View style={styles.modalIconBg}>
                    <Users
                      color={passengers === item ? 'white' : colors.primary}
                      size={20}
                    />
                  </View>
                  <Text
                    style={[
                      styles.modalItemText,
                      passengers === item && {
                        color: colors.primary,
                        fontFamily: 'Inter_18pt-Bold',
                      },
                    ]}
                  >
                    {item}
                  </Text>
                  {passengers === item && <View style={styles.selectedDot} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Seat Class Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={classModalVisible}
        onRequestClose={() => setClassModalVisible(false)}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Seat Class</Text>
              <TouchableOpacity onPress={() => setClassModalVisible(false)}>
                <X color="black" size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={SEAT_CLASSES}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItemWrapper}
                  onPress={() => {
                    setSeatClass(item);
                    setClassModalVisible(false);
                  }}
                >
                  <View style={styles.modalIconBg}>
                    <Armchair
                      color={seatClass === item ? 'white' : colors.primary}
                      size={20}
                    />
                  </View>
                  <Text
                    style={[
                      styles.modalItemText,
                      seatClass === item && {
                        color: colors.primary,
                        fontFamily: 'Inter_18pt-Bold',
                      },
                    ]}
                  >
                    {item}
                  </Text>
                  {seatClass === item && <View style={styles.selectedDot} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 0,
  },
  header: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingTop: spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_18pt-Bold',
    color: 'white',
    marginLeft: spacing.m,
    marginBottom: spacing.m,
    marginTop: spacing.l,
  },

  // New Main Content Container
  mainContent: {
    marginTop: -40, // Overlap
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.l,
    paddingHorizontal: spacing.m,
    minHeight: height - 160, // Ensure it fills down
  },

  formSection: {
    marginBottom: spacing.l,
  },

  inputContainer: {
    marginBottom: spacing.xs,
  },
  inputLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    backgroundColor: 'white',
    position: 'absolute',
    top: -8,
    left: 10,
    zIndex: 1,
    paddingHorizontal: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: spacing.s,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_18pt-Medium',
    color: '#333',
  },
  separator: {
    height: spacing.m,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  roundTripToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.m,
  },
  toggleLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
  },
  searchButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.l,
  },
  searchButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },

  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    marginBottom: spacing.m,
    color: 'black',
  },
  voucherCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    marginRight: spacing.m,
    width: width * 0.85,
    alignItems: 'center',
    // Simplified shadow for flat look inside sheet, or keep it to pop
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  voucherIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#20A39E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  voucherContent: {
    flex: 1,
  },
  voucherTextTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 2,
  },
  voucherTextSub: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  voucherCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  codeText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  copyButton: {
    backgroundColor: '#20A39E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Promo / Budget Styles
  promoCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: spacing.m,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  promoImage: {
    width: '100%',
    height: 100,
  },
  promoLabel: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  promoLabelText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter_18pt-Regular',
  },
  promoContent: {
    padding: spacing.s,
  },
  promoTitle: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
  },
  promoDate: {
    fontSize: 10,
    color: '#666',
    marginBottom: 8,
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  airlineIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#CCC',
    marginRight: 4,
  },
  airlineName: {
    fontSize: 10,
    color: '#444',
  },
  promoOriginalPrice: {
    fontSize: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  promoPrice: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: colors.primary,
  },
  promoTax: {
    fontSize: 10,
    color: '#9CA3AF',
  },

  // Menu Items
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  menuIconPlaceholder: {
    width: 32,
    height: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: spacing.m,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '75%',
    paddingTop: spacing.m,
    paddingHorizontal: spacing.m,
    paddingBottom: 40, // Extra padding for bottom safe area/nav bar
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
    paddingBottom: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  airportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  airportIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  airportItemContent: {
    flex: 1,
  },
  airportCity: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 2,
  },
  airportName: {
    fontSize: 12,
    color: '#666',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  // Date Modal Styles
  dateItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dateIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F6F6', // Or primary if selected
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Medium',
    color: '#333',
    flex: 1,
  },

  // Generic Modal Item Styles (reused)
  modalItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F6F6', // Or primary if selected
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Medium',
    color: '#333',
    flex: 1,
  },

  // Option Row
  optionRow: {
    flexDirection: 'row',
  },
});
