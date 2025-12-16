import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Building2,
  Plane,
  Clock,
  Wallet,
  Users,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Search,
  X,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, typography } from '../theme/theme';
import { useUmrahOptions } from '../hooks/useUmrahOptions';
import { Country } from '../types/umrah';

const bannerImage = require('../assets/banner/hajj.jpeg');

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'HajjSearch'>;

export const HajjSearchScreen = ({ navigation }: Props) => {
  const [passengers, setPassengers] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState('Malaysia');
  const [selectedCity, setSelectedCity] = useState(
    'Bandara Soekarno-Hatta (CGK)',
  );
  const [selectedDepartureTime, setSelectedDepartureTime] = useState('Select');
  const [selectedCost, setSelectedCost] = useState('< $17.500');
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [departureTimeModalVisible, setDepartureTimeModalVisible] =
    useState(false);
  const [costModalVisible, setCostModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [citySearchQuery, setCitySearchQuery] = useState('');

  const { options, isLoading } = useUmrahOptions();

  // Use options from hook or fallback to empty arrays
  const COUNTRIES_DATA = options?.countries || [];
  const RECENT_SEARCHES = options?.recentSearches || [];
  const POPULAR_CITIES = options?.popularCities || [];
  const DEPARTURE_MONTHS = options?.departureMonths || [];
  const COST_RANGES = options?.costRanges || [];

  const filteredCountries = COUNTRIES_DATA.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const incrementPassengers = () => setPassengers(prev => prev + 1);
  const decrementPassengers = () =>
    setPassengers(prev => Math.max(1, prev - 1));

  // ... inside component ...
  // Check if options are loaded
  const isLoaded = !isLoading && options;

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country.name);
    setCountryModalVisible(false);
    setSearchQuery('');
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityModalVisible(false);
  };

  console.log('Rendering HajjSearchScreen', {
    isLoading,
    optionsLoaded: !!options,
  });

  const handleDepartureTimeSelect = (time: string) => {
    setSelectedDepartureTime(time);
    setDepartureTimeModalVisible(false);
  };

  const handleCostSelect = (cost: string) => {
    setSelectedCost(cost);
    setCostModalVisible(false);
  };

  const FormItem = ({
    label,
    value,
    icon: Icon,
    isDropdown = false,
    onPress,
  }: {
    label: string;
    value: string;
    icon: any;
    isDropdown?: boolean;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={styles.formItem}
      onPress={onPress}
      disabled={!onPress && !isDropdown}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.valueRow}>
          <Icon color="black" size={24} style={styles.icon} />
          <Text style={styles.valueText}>{value}</Text>
        </View>
        {isDropdown && <ChevronDown color="black" size={20} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header Image */}
      <ImageBackground source={bannerImage} style={styles.headerImage}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Hajj Package</Text>
        </View>
      </ImageBackground>

      {/* Content */}
      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formContainer}>
            <FormItem
              label="Country"
              value={selectedCountry}
              icon={Building2}
              isDropdown
              onPress={() => {
                console.log('Country dropdown pressed');
                setCountryModalVisible(true);
              }}
            />

            <FormItem
              label="Departure Location"
              value={selectedCity}
              icon={Plane}
              onPress={() => setCityModalVisible(true)}
              isDropdown // Making it pressable even though icon isn't chevron
            />

            <FormItem
              label="Departure Time"
              value={selectedDepartureTime}
              icon={Clock}
              isDropdown
              onPress={() => setDepartureTimeModalVisible(true)}
            />

            <FormItem
              label="Cost"
              value={selectedCost}
              icon={Wallet}
              isDropdown
              onPress={() => setCostModalVisible(true)}
            />

            {/* Passengers Counter */}
            <View style={styles.formItem}>
              <Text style={styles.label}>Number of Passengers</Text>
              <View style={styles.inputContainer}>
                <View style={styles.valueRow}>
                  <Users color="black" size={24} style={styles.icon} />
                  <Text style={styles.valueText}>
                    {passengers} Passenger{passengers > 1 ? 's' : ''}
                  </Text>
                </View>

                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    onPress={decrementPassengers}
                    style={styles.counterButton}
                  >
                    <Minus color="black" size={16} />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{passengers}</Text>
                  <TouchableOpacity
                    onPress={incrementPassengers}
                    style={styles.counterButton}
                  >
                    <Plus color="black" size={16} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate('PackageList')}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Country Selection Modal */}
      <Modal
        visible={countryModalVisible}
        animationType="slide"
        onRequestClose={() => setCountryModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity onPress={() => setCountryModalVisible(false)}>
              <X color="black" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search
              color={colors.textLight}
              size={20}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search country"
              placeholderTextColor={colors.textLight}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => handleCountrySelect(item)}
              >
                <Text style={styles.countryName}>{item.name}</Text>
                {selectedCountry === item.name && (
                  <View style={styles.selectedDot} />
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
          />
        </SafeAreaView>
      </Modal>

      {/* City Selection Modal */}
      <Modal
        visible={cityModalVisible}
        animationType="slide"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select a City or Airport</Text>
            <TouchableOpacity onPress={() => setCityModalVisible(false)}>
              <X color="black" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search
              color={colors.textLight}
              size={20}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Enter a city or airport"
              placeholderTextColor={colors.textLight}
              style={styles.searchInput}
              value={citySearchQuery}
              onChangeText={setCitySearchQuery}
            />
          </View>

          <ScrollView contentContainerStyle={styles.listContent}>
            {/* Recently Search */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recently Search</Text>
              <TouchableOpacity>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>

            {RECENT_SEARCHES.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.recentItem}
                onPress={() =>
                  handleCitySelect(`${item.city}, ${item.country}`)
                }
              >
                <View style={styles.recentIconContainer}>
                  <Building2 color="black" size={20} />
                </View>
                <View>
                  <Text style={styles.recentCity}>
                    {item.city}, {item.country}
                  </Text>
                  <Text style={styles.recentSubtext}>{item.subtext}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.separator} />

            {/* Popular City */}
            <Text style={[styles.sectionTitle, styles.popularTitle]}>
              Popular City
            </Text>
            <View style={styles.popularContainer}>
              {POPULAR_CITIES.map((city, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.popularChip}
                  onPress={() => handleCitySelect(city)}
                >
                  <Text style={styles.popularChipText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Departure Time Modal */}
      <Modal
        visible={departureTimeModalVisible}
        animationType="slide"
        onRequestClose={() => setDepartureTimeModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Departure Time</Text>
            <TouchableOpacity
              onPress={() => setDepartureTimeModalVisible(false)}
            >
              <X color="black" size={24} />
            </TouchableOpacity>
          </View>

          {/* List of Months */}
          <FlatList
            data={DEPARTURE_MONTHS}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dateItem}
                onPress={() => handleDepartureTimeSelect(item)}
              >
                <Clock color="black" size={24} style={styles.icon} />
                <Text style={styles.dateText}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.dateListContent}
          />
        </SafeAreaView>
      </Modal>

      {/* Cost Selection Modal */}
      <Modal
        visible={costModalVisible}
        animationType="slide"
        onRequestClose={() => setCostModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Cost Range</Text>
            <TouchableOpacity onPress={() => setCostModalVisible(false)}>
              <X color="black" size={24} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={COST_RANGES}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dateItem}
                onPress={() => handleCostSelect(item)}
              >
                <Wallet color="black" size={24} style={styles.icon} />
                <Text style={styles.dateText}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.dateListContent}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Fallback behind image
  },
  headerImage: {
    height: 300,
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  headerSafeArea: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.s,
  },
  backButton: {
    // No margin needed
  },
  titleContainer: {
    position: 'absolute',
    bottom: 60, // Clear the 40px overlap + padding
    left: spacing.m,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_18pt-Bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: spacing.m,
    paddingBottom: spacing.xl,
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  formItem: {
    marginBottom: spacing.l,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
    marginBottom: spacing.xs,
    backgroundColor: 'white',
    position: 'absolute',
    top: -8,
    left: 12,
    zIndex: 1,
    paddingHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    height: 56,
    backgroundColor: 'white',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.s,
  },
  valueText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#20A39E',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  counterButton: {
    padding: 4,
  },
  counterText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
    marginHorizontal: spacing.s,
    minWidth: 20,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#20A39E',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.m,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    margin: spacing.m,
    paddingHorizontal: spacing.m,
    borderRadius: 8,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.s,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    color: colors.text,
    height: 48,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  countryName: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#20A39E',
  },
  // New styles for City Modal
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    marginTop: spacing.m,
    marginBottom: spacing.s,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  clearText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: '#20A39E',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  recentIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  recentCity: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  recentSubtext: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: spacing.m,
    marginVertical: spacing.m,
  },
  popularTitle: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.s,
  },
  popularContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.m,
  },
  popularChip: {
    paddingHorizontal: spacing.m,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: spacing.s,
    marginBottom: spacing.s,
  },
  popularChipText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: colors.text,
  },
  // Date Modal Styles
  dateListContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.xl,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
  },
});
