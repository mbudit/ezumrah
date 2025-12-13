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
  Plane,
  Calendar,
  Users,
  Armchair,
  ArrowRight,
  Info,
  Copy,
  ChevronRight,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing } from '../theme/theme';

const { width, height } = Dimensions.get('window');

interface FlightSearchScreenProps {
  onBackPress: () => void;
  onSearchPress?: () => void;
}

export const FlightSearchScreen = ({
  onBackPress,
  onSearchPress,
}: FlightSearchScreenProps) => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureCity, setDepartureCity] = useState(
    'Bandara Soekarno-Hatta (CGK)',
  );
  const [arrivalCity, setArrivalCity] = useState('Bali / Denpasar (DPS)');
  const [date, setDate] = useState('Thurs, 02 Oct 2025');
  const [passengers, setPassengers] = useState('1 Passenger');
  const [seatClass, setSeatClass] = useState('Economy');

  const renderInput = (
    label: string,
    value: string,
    icon: React.ReactNode,
    placeholder?: string,
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.inputIcon}>{icon}</View>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          editable={false}
        />
      </View>
    </View>
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
              <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
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
              departureCity,
              <Plane
                size={20}
                color="#555"
                style={{ transform: [{ rotate: '-45deg' }] }}
              />,
            )}

            <View style={{ height: spacing.m }} />

            {renderInput(
              'To',
              arrivalCity,
              <Plane
                size={20}
                color="#555"
                style={{ transform: [{ rotate: '45deg' }] }}
              />,
            )}

            <View style={styles.separator} />

            {/* Date & Toggle */}
            <View style={styles.dateRow}>
              <View style={{ flex: 1 }}>
                {renderInput('Time', date, <Calendar size={20} color="#555" />)}
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
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: spacing.s }}>
                {renderInput(
                  'Passengers',
                  passengers,
                  <Users size={20} color="#555" />,
                )}
              </View>
              <View style={{ flex: 1, marginLeft: spacing.s }}>
                {renderInput(
                  'Seat Class',
                  seatClass,
                  <Armchair size={20} color="#555" />,
                )}
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity
              style={styles.searchButton}
              onPress={onSearchPress}
            >
              <Text style={styles.searchButtonText}>Search</Text>
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
    backgroundColor: '#20A39E',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.l,
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
});
