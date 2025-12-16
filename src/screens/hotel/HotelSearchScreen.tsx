import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Map,
  Search,
  Calendar,
  Users,
  Building,
  Info,
  Copy,
  Star,
} from 'lucide-react-native';
import { colors, spacing, typography } from '../../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'HotelSearch'>;

export const HotelSearchScreen = ({ navigation }: Props) => {
  /* State */
  const [activeLocationTab, setActiveLocationTab] = useState('Penang');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [guestModalVisible, setGuestModalVisible] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('Thurs, 02 Oct 2025');
  const [viewDate, setViewDate] = useState(new Date());
  const [guestData, setGuestData] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
  });

  /* Data */
  const locations = ['Penang', 'Langkawi', 'Ipoh', 'Johor Bahru', 'Sabah'];

  const hotels = [
    {
      id: '1',
      name: 'WEIL Hotel Ipoh',
      rating: 4.5,
      reviewCount: 90,
      originalPrice: 'IDR 519,000',
      price: 'IDR 506,106',
      image: require('../../assets/banner/hotel.png'), // Placeholder needed
    },
    {
      id: '2',
      name: 'WEIL Hotel Ipoh',
      rating: 4.5,
      reviewCount: 90,
      originalPrice: 'IDR 519,000',
      price: 'IDR 506,106',
      image: require('../../assets/banner/hotel.png'), // Placeholder needed
    },
  ];

  const renderVoucher = () => (
    <View style={styles.voucherCard}>
      <View style={styles.voucherHeader}>
        <View style={styles.voucherIconContainer}>
          <Building color="white" size={20} />
        </View>
        <View style={styles.voucherContent}>
          <View style={styles.voucherTitleRow}>
            <Text style={styles.voucherTitle}>Cashback s/d 150K</Text>
            <Info size={14} color="#999" />
          </View>
          <Text style={styles.voucherSubtitle}>
            min. transaction IDR 1,500,000
          </Text>
        </View>
      </View>
      <View style={styles.voucherFooter}>
        <View style={styles.codeContainer}>
          <Text style={styles.msgCode}>GOHOTEL</Text>
          <Copy size={14} color="#555" />
        </View>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Location Modal */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                <Text style={{ fontSize: 20, color: 'black' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={locations}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItemWrapper}
                  onPress={() => {
                    setSelectedLocation(item);
                    setLocationModalVisible(false);
                  }}
                >
                  <View style={styles.modalIconBg}>
                    <Map size={20} color={colors.primary} />
                  </View>
                  <Text style={styles.modalItemText}>{item}</Text>
                  {selectedLocation === item && (
                    <View style={styles.selectedDot} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Date Modal */}
      <Modal
        visible={dateModalVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setDateModalVisible(false)}>
                <Text style={{ fontSize: 20, color: 'black' }}>✕</Text>
              </TouchableOpacity>
            </View>
            {/* Dynamic Calendar with Navigation */}
            <View style={styles.calendarContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    const newDate = new Date(viewDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    // Prevent going back before current month
                    const today = new Date();
                    if (
                      newDate.getFullYear() > today.getFullYear() ||
                      (newDate.getFullYear() === today.getFullYear() &&
                        newDate.getMonth() >= today.getMonth())
                    ) {
                      setViewDate(newDate);
                    }
                  }}
                >
                  <Text style={{ fontSize: 20, padding: 8 }}>{'<'}</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Inter_18pt-Bold',
                    fontSize: 16,
                  }}
                >
                  {viewDate.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    const newDate = new Date(viewDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setViewDate(newDate);
                  }}
                >
                  <Text style={{ fontSize: 20, padding: 8 }}>{'>'}</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 8,
                  justifyContent: 'center',
                }}
              >
                {(() => {
                  const today = new Date();
                  const currentYear = viewDate.getFullYear();
                  const currentMonth = viewDate.getMonth();
                  const daysInMonth = new Date(
                    currentYear,
                    currentMonth + 1,
                    0,
                  ).getDate();

                  return Array.from(
                    { length: daysInMonth },
                    (_, i) => i + 1,
                  ).map(d => {
                    // Disable logic: if viewDate is same month/year as today, disable past days
                    let isDisabled = false;
                    if (
                      currentYear === today.getFullYear() &&
                      currentMonth === today.getMonth()
                    ) {
                      isDisabled = d < today.getDate();
                    } else if (
                      currentYear < today.getFullYear() ||
                      (currentYear === today.getFullYear() &&
                        currentMonth < today.getMonth())
                    ) {
                      isDisabled = true; // should be prevented by nav buttons but good safety
                    }

                    return (
                      <TouchableOpacity
                        key={d}
                        disabled={isDisabled}
                        style={[styles.dateCell]}
                        onPress={() => {
                          const dateObj = new Date(
                            currentYear,
                            currentMonth,
                            d,
                          );
                          // Format: Thurs, 02 Oct 2025
                          const days = [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                          ];
                          const months = [
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
                          const formatted = `${days[dateObj.getDay()]}, ${d
                            .toString()
                            .padStart(2, '0')} ${
                            months[currentMonth]
                          } ${currentYear}`;
                          setSelectedDate(formatted);
                          setDateModalVisible(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dateText,
                            isDisabled && { color: '#ccc' },
                          ]}
                        >
                          {d}
                        </Text>
                      </TouchableOpacity>
                    );
                  });
                })()}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Guest Modal */}
      <Modal
        visible={guestModalVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setGuestModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Guests</Text>
              <TouchableOpacity onPress={() => setGuestModalVisible(false)}>
                <Text style={{ fontSize: 20, color: 'black' }}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.guestRow}>
              <Text style={styles.guestLabel}>Rooms</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setGuestData(p => ({
                      ...p,
                      rooms: Math.max(1, p.rooms - 1),
                    }))
                  }
                >
                  <Text style={styles.counterBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{guestData.rooms}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setGuestData(p => ({ ...p, rooms: p.rooms + 1 }))
                  }
                >
                  <Text style={styles.counterBtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.guestRow}>
              <Text style={styles.guestLabel}>Adults</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setGuestData(p => ({
                      ...p,
                      adults: Math.max(1, p.adults - 1),
                    }))
                  }
                >
                  <Text style={styles.counterBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{guestData.adults}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setGuestData(p => ({ ...p, adults: p.adults + 1 }))
                  }
                >
                  <Text style={styles.counterBtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.guestRow}>
              <Text style={styles.guestLabel}>Children</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setGuestData(p => ({
                      ...p,
                      children: Math.max(0, p.children - 1),
                    }))
                  }
                >
                  <Text style={styles.counterBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{guestData.children}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setGuestData(p => ({ ...p, children: p.children + 1 }))
                  }
                >
                  <Text style={styles.counterBtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setGuestModalVisible(false)}
            >
              <Text style={styles.saveButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header Background */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        }}
        style={styles.headerImage}
      >
        <SafeAreaView edges={['top']} style={styles.safeHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft color="black" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hotel</Text>
        </SafeAreaView>
      </ImageBackground>

      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Search Card */}
        <View style={styles.searchCard}>
          {/* Location Input */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setLocationModalVisible(true)}
          >
            <Text style={styles.inputLabel}>Location</Text>
            <View style={styles.inputWrapper}>
              <Building size={20} color="#555" style={styles.inputIcon} />
              <Text
                style={[
                  styles.inputText,
                  !selectedLocation && { color: '#999' },
                ]}
              >
                {selectedLocation || 'Search destination, landmark, etc'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Time Input */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setDateModalVisible(true)}
          >
            <Text style={styles.inputLabel}>Time</Text>
            <View style={styles.inputWrapper}>
              <Calendar size={20} color="#555" style={styles.inputIcon} />
              <Text style={styles.inputText}>{selectedDate}</Text>
            </View>
          </TouchableOpacity>

          {/* Guest Input */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setGuestModalVisible(true)}
          >
            <Text style={styles.inputLabel}>Guest</Text>
            <View style={styles.inputWrapper}>
              <Users size={20} color="#555" style={styles.inputIcon} />
              <Text style={styles.inputText}>
                {guestData.rooms} Room, {guestData.adults} adults,{' '}
                {guestData.children} children
              </Text>
            </View>
          </TouchableOpacity>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.mapButton}>
              <Text style={styles.mapButtonText}>Maps</Text>
              <Map size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() =>
                navigation.navigate('HotelResults', {
                  searchParams: {
                    selectedLocation,
                    selectedDate,
                    guestData,
                  },
                })
              }
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Voucher Section */}
        <Text style={styles.sectionTitle}>Hurry! Claim your voucher!</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.voucherList}
        >
          {renderVoucher()}
          {renderVoucher()}
        </ScrollView>

        {/* Promoted Stay */}
        <View style={styles.promotedHeader}>
          <Text style={styles.sectionTitle}>Promoted Stay!</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>11</Text>
            <Text style={styles.timerColon}>:</Text>
            <Text style={styles.timerText}>22</Text>
            <Text style={styles.timerColon}>:</Text>
            <Text style={styles.timerText}>16</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.locationTabs}
        >
          {locations.map(loc => (
            <TouchableOpacity
              key={loc}
              style={[
                styles.locationTab,
                activeLocationTab === loc && styles.activeLocationTab,
              ]}
              onPress={() => setActiveLocationTab(loc)}
            >
              <Text
                style={[
                  styles.locationTabText,
                  activeLocationTab === loc && styles.activeLocationTabText,
                ]}
              >
                {loc}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={hotels}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.hotelList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.hotelCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                }}
                style={styles.hotelImage}
              />
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{item.name}</Text>
                <View style={styles.ratingRow}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      size={12}
                      color="#F59E0B"
                      fill={i <= Math.floor(item.rating) ? '#F59E0B' : 'white'}
                    />
                  ))}
                  <Text style={styles.reviewText}>
                    {item.rating}/5 ({item.reviewCount} review)
                  </Text>
                </View>
                <Text style={styles.oldPrice}>{item.originalPrice}</Text>
                <Text style={styles.newPrice}>{item.price}</Text>
                <Text style={styles.taxInfo}>(Excluding taxes)</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
  },
  safeHeader: {
    paddingHorizontal: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.s,
  },
  backButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    marginRight: spacing.m,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: 'white', // Over image, white is usually better, but design shows black "Hotel" maybe on a white strip?
    // Looking at the mockup, "Hotel" is white text over the image. The back button is white circle.
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -40, // Pull up over image
    paddingTop: spacing.l,
    paddingHorizontal: spacing.m,
  },
  searchCard: {
    backgroundColor: 'white',
    // In design it looks like individual fields, not a unified card shadow, but grouped.
    marginBottom: spacing.l,
  },
  inputContainer: {
    marginBottom: spacing.m,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    height: 60,
    justifyContent: 'center',
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#666',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  inputIcon: {
    marginRight: spacing.s,
  },
  textInput: {
    flex: 1,
    padding: 0,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter_18pt-Regular',
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter_18pt-Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.m,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1', // Light teal
    paddingHorizontal: spacing.m,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  mapButtonText: {
    color: colors.primary,
    fontFamily: 'Inter_18pt-Bold',
  },
  searchButton: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
  },
  searchButtonText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.m,
  },
  voucherList: {
    paddingBottom: spacing.l,
    gap: spacing.m,
  },
  voucherCard: {
    width: 280,
    backgroundColor: '#FEF9C3', // Light yellow
    borderRadius: 12,
    padding: spacing.m,
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  voucherHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.m,
  },
  voucherIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.s,
  },
  voucherContent: {
    flex: 1,
  },
  voucherTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  voucherTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  voucherSubtitle: {
    fontSize: 11,
    color: '#666',
  },
  voucherFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF08A',
    borderRadius: 8,
    padding: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  msgCode: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    color: '#333',
  },
  copyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter_18pt-Bold',
  },
  promotedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    marginBottom: spacing.m,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timerText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    paddingHorizontal: 2,
  },
  timerColon: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationTabs: {
    flexDirection: 'row',
    marginBottom: spacing.m,
  },
  locationTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: spacing.s,
    backgroundColor: 'white',
  },
  activeLocationTab: {
    backgroundColor: '#E0F2F1',
    borderColor: colors.primary,
  },
  locationTabText: {
    fontSize: 13,
    color: '#555',
  },
  activeLocationTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  hotelList: {
    paddingRight: spacing.m,
  },
  hotelCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: spacing.l, // For shadow
  },
  hotelImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  hotelInfo: {
    padding: spacing.s,
  },
  hotelName: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
  },
  oldPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'Inter_18pt-Bold',
  },
  taxInfo: {
    fontSize: 10,
    color: '#999',
  },
  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end', // Bottom sheet style
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.m,
    paddingHorizontal: spacing.m,
    paddingBottom: 40,
    maxHeight: '80%', // Limit height
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
    backgroundColor: '#E6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  modalItemText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter_18pt-Medium',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  closeButton: {
    marginTop: spacing.l,
    alignItems: 'center',
    padding: spacing.s,
  },
  closeButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  // Calendar adjustments
  calendarContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: spacing.m,
  },
  dateCell: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  activeDateCell: {
    backgroundColor: colors.primary,
  },
  dateText: {
    color: '#333',
  },
  activeDateText: {
    color: 'white',
    fontWeight: 'bold',
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  guestLabel: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter_18pt-Medium',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counterBtn: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  counterValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.m,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
