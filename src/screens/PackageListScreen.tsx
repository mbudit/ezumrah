import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ArrowUpDown,
  Filter,
  ChevronDown,
  Copy,
  Star,
  MapPin,
  Calendar,
  Bus,
  X,
  Plane,
  Clock,
  Users,
  Minus,
  Plus,
  Search,
  Building2,
  Wallet,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';

interface PackageListScreenProps {
  onBackPress: () => void;
}

const PACKAGE_DATA = [
  {
    id: '1',
    type: 'Regular Haj',
    vendor: 'PT Azzam Albesuni',
    title: 'Hajj Plus 2026',
    rating: '1.538',
    address: 'Address Jamal Omar',
    distance: "500m from Ka'bah",
    ratingScore: 5,
    days: '21 Days',
    transport: 'Transport VIP',
    originalPrice: 'RM 31.598',
    discount: '-4%',
    price: 'RM 30.334',
    seats: 23,
    totalSeats: 30,
    image: require('../assets/banner/umrah.png'), // Reusing umrah banner for now
  },
  {
    id: '2',
    type: 'CNH',
    vendor: 'PT Azzam Albesuni',
    title: 'Hajj Plus 2026',
    rating: '1.538',
    address: 'Address Jamal Omar',
    distance: "500m from Ka'bah",
    ratingScore: 5,
    days: '21 Days',
    transport: 'Transport VIP',
    originalPrice: 'RM 31.598',
    discount: '-4%',
    price: 'RM 30.334',
    seats: 23,
    totalSeats: 30,
    image: require('../assets/banner/umrah.png'),
  },
  {
    id: '3',
    type: 'Regular Haj',
    vendor: 'PT Azzam Albesuni',
    title: 'Hajj Plus 2026',
    rating: '1.538',
    address: 'Address Jamal Omar',
    distance: "500m from Ka'bah",
    ratingScore: 5,
    days: '21 Days',
    transport: 'Transport VIP',
    originalPrice: 'RM 31.598',
    discount: '-4%',
    price: 'RM 30.334',
    seats: 23,
    totalSeats: 30,
    image: require('../assets/banner/umrah.png'),
  },
];

const VENDOR_DATA = [
  {
    id: '1',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'), // Placeholder, will use text if image fails or use a generic one
  },
  {
    id: '2',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '3',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '4',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '5',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '6',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
];

const DEPARTURE_MONTHS = [
  'January 2027',
  'February 2027',
  'March 2027',
  'April 2027',
  'May 2027',
  'June 2027',
  'July 2027',
  'August 2027',
  'September 2027',
  'October 2027',
  'November 2027',
  'December 2027',
];

const COST_RANGES = [
  '< $17.500',
  '$17.500 - $19.650',
  '$20.000 - $ 28.850',
  '$29.850 - $31.450',
  '$52.900 - $58.500',
  '$52.900 - $58.500',
];

const RECENT_SEARCHES = [
  {
    id: '1',
    city: 'Soekarno Hatta International Airport',
    code: 'CGK',
    location: 'Jakarta, Indonesia',
    type: 'airport',
  },
  {
    id: '2',
    city: 'Soekarno Hatta International Airport',
    code: 'CGK',
    location: 'Jakarta, Indonesia',
    type: 'airport',
  },
  {
    id: '3',
    city: 'Kuala Lumpur',
    code: 'All airports',
    location: 'Malaysia',
    type: 'city',
  },
];

const POPULAR_CITIES = [
  'Soekarno Hatta International Airport (CGK)',
  'Kuala Lumpur (All airports)',
  'Kuala Lumpur (All airports)',
  'Soekarno Hatta International Airport (CGK)',
  'Soekarno Hatta International Airport (CGK)',
  'Kuala Lumpur (All airports)',
];

interface PackageListScreenProps {
  onBackPress: () => void;
  onVendorPress?: () => void;
  onPackagePress?: () => void;
}

export const PackageListScreen = ({
  onBackPress,
  onVendorPress,
  onPackagePress,
}: PackageListScreenProps) => {
  const [activeTab, setActiveTab] = useState<'Product' | 'Vendor'>('Product');

  const renderHeader = () => (
    <View style={styles.header}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ArrowLeft color="black" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTexts}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              Soekarno-Hatta (CGK){' '}
              <Text style={styles.headerProperties}>- 30 Properties</Text>
            </Text>
            <Text style={styles.headerSubtitle}>20 Mei 2026, 1 Passenger</Text>
          </View>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => setChangeSearchModalVisible(true)}
          >
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Product' && styles.activeTab]}
            onPress={() => setActiveTab('Product')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Product' && styles.activeTabText,
              ]}
            >
              Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Vendor' && styles.activeTab]}
            onPress={() => setActiveTab('Vendor')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Vendor' && styles.activeTabText,
              ]}
            >
              Vendor
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  const renderFilters = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtersScroll}
      contentContainerStyle={styles.filtersContent}
    >
      <TouchableOpacity style={styles.filterItem}>
        <ArrowUpDown color={colors.text} size={16} />
        <Text style={styles.filterText}>Sort</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterItem}>
        <Filter color={colors.text} size={16} />
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterItem}>
        <Text style={styles.filterText}>Country</Text>
        <ChevronDown color={colors.text} size={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterItem}>
        <Text style={styles.filterText}>Rating</Text>
        <ChevronDown color={colors.text} size={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterItem}>
        <Text style={styles.filterText}>Airlines</Text>
        <ChevronDown color={colors.text} size={16} />
      </TouchableOpacity>
    </ScrollView>
  );

  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerContent}>
        <View style={styles.bannerIcon}>
          <Text style={styles.percentageText}>%</Text>
        </View>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerText}>
            Claim the code <Text style={styles.boldText}>YUKHAJI</Text> and save
            up to IDR 100,000 on your first Hajj booking.
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCard = ({ item }: { item: (typeof PACKAGE_DATA)[0] }) => (
    <TouchableOpacity style={styles.card} onPress={onPackagePress}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.tagsContainer}>
          <View
            style={[
              styles.tag,
              item.type === 'CNH' ? styles.cnhTag : styles.regularTag,
            ]}
          >
            <Text style={styles.tagText}>{item.type}</Text>
          </View>
        </View>
        <View style={styles.vendorTag}>
          <Text style={styles.vendorText}>{item.vendor}</Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.ratingText}>({item.rating} Review)</Text>
        </View>

        <View style={styles.addressRow}>
          <MapPin color="#666" size={14} style={styles.addressIcon} />
          <Text style={styles.addressText}>{item.address}</Text>
          <View style={styles.starsRow}>
            {[...Array(item.ratingScore)].map((_, i) => (
              <Star
                key={i}
                color="#FFC107"
                fill="#FFC107"
                size={12}
                style={styles.star}
              />
            ))}
          </View>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>

        <View style={styles.amenitiesRow}>
          <View style={styles.amenityBadge}>
            <Calendar color="#3B82F6" size={14} />
            <Text style={styles.amenityText}>{item.days}</Text>
          </View>
          <View style={styles.amenityBadge}>
            <Bus color="#10B981" size={14} />
            <Text style={styles.amenityText}>{item.transport}</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.seatsContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${(item.seats / item.totalSeats) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.seatsText}>
              Remaining seats: {item.seats}/{item.totalSeats}
            </Text>
          </View>
          <View style={styles.priceInfo}>
            <View style={styles.discountRow}>
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            </View>
            <Text style={styles.finalPrice}>{item.price}</Text>
            <Text style={styles.taxText}>(Including pajak)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderVendorCard = ({ item }: { item: (typeof VENDOR_DATA)[0] }) => (
    <TouchableOpacity style={styles.vendorCard} onPress={onVendorPress}>
      {/* Logo/Header Placeholder */}
      <View style={styles.vendorHeader}>
        {/* Using Text as Logo placeholder since we don't have the image asset handy yet,
            or rely on the image logic if avail. We'll use a Styled Text for now to match 'ezumrah.com' look */}
        <Text style={styles.vendorLogoText}>
          ez<Text style={styles.vendorLogoTextDark}>umrah</Text>
          <Text style={styles.vendorLogoTextSmall}>.com</Text>
        </Text>
      </View>

      {/* Tags */}
      <View style={styles.vendorTagsRow}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.vendorTagItem}>
            <Text style={styles.vendorTagText}>{tag}</Text>
          </View>
        ))}
        {/* We crop to 3 tags max usually based on UI, but data has 3 so it fits */}
      </View>

      {/* Vendor Info */}
      <Text style={styles.vendorName}>{item.name}</Text>
      <Text style={styles.vendorLocation}>
        {item.location} • {item.since}
      </Text>

      {/* Rating */}
      <View style={styles.vendorRatingRow}>
        <Star color="black" fill="black" size={12} />
        <Text style={styles.vendorRatingScore}>{item.rating}</Text>
        <Text style={styles.vendorReviewCount}>/5 ({item.reviews} review)</Text>
      </View>

      {/* License */}
      <Text style={styles.vendorLicense}>{item.license}</Text>

      {/* Price */}
      <View style={styles.vendorPriceContainer}>
        <Text style={styles.vendorFromText}>from</Text>
        <Text style={styles.vendorPriceText}>{item.startPrice}</Text>
      </View>
    </TouchableOpacity>
  );

  /* Change Search Modal */
  const [changeSearchModalVisible, setChangeSearchModalVisible] =
    useState(false);
  const [departureTimeModalVisible, setDepartureTimeModalVisible] =
    useState(false);
  const [costModalVisible, setCostModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');

  const [csPassengers, setCsPassengers] = useState(1);
  const [csLocation, setCsLocation] = useState('Bandara Soekarno-Hatta (CGK)');
  const [csTime, setCsTime] = useState('January 2027');
  const [csCost, setCsCost] = useState('< $17.500');

  const incrementCsPassengers = () => setCsPassengers(prev => prev + 1);
  const decrementCsPassengers = () =>
    setCsPassengers(prev => Math.max(1, prev - 1));

  const handleCitySelect = (city: string) => {
    setCsLocation(city);
    setCityModalVisible(false);
  };

  const handleDepartureTimeSelect = (time: string) => {
    setCsTime(time);
    setDepartureTimeModalVisible(false);
  };

  const handleCostSelect = (cost: string) => {
    setCsCost(cost);
    setCostModalVisible(false);
  };

  const FormItem = ({
    label,
    value,
    icon: Icon,
    isDropdown = false,
    renderRight,
    onPress,
  }: {
    label: string;
    value: string;
    icon: any;
    isDropdown?: boolean;
    renderRight?: React.ReactNode;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={styles.formItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.modalParamsLabel}>{label}</Text>
      <View style={styles.modalInputContainer}>
        <View style={styles.valueRow}>
          <Icon color="black" size={24} style={styles.formIcon} />
          <Text style={styles.valueText}>{value}</Text>
        </View>
        {renderRight ? (
          renderRight
        ) : isDropdown ? (
          <ChevronDown color="black" size={20} />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  const renderDepartureTimeModal = () => (
    <Modal
      visible={departureTimeModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Departure Time</Text>
          <TouchableOpacity onPress={() => setDepartureTimeModalVisible(false)}>
            <X color="black" size={24} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={DEPARTURE_MONTHS}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dateItem}
              onPress={() => handleDepartureTimeSelect(item)}
            >
              <Clock color="black" size={24} style={styles.formIcon} />
              <Text style={styles.dateText}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.dateListContent}
        />
      </SafeAreaView>
    </Modal>
  );

  const renderCostModal = () => (
    <Modal
      visible={costModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
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
              <Wallet color="black" size={24} style={styles.formIcon} />
              <Text style={styles.dateText}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.dateListContent}
        />
      </SafeAreaView>
    </Modal>
  );

  const renderChangesSearchModal = () => (
    <Modal
      visible={changeSearchModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setChangeSearchModalVisible(false)}>
            <X color="black" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Change Search</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.modalContent}>
          <FormItem
            label="Departure Location"
            value={csLocation}
            icon={Plane}
            onPress={() => setCityModalVisible(true)}
          />

          <FormItem
            label="Departure Time"
            value={csTime}
            icon={Clock}
            isDropdown
            onPress={() => setDepartureTimeModalVisible(true)}
          />

          <FormItem
            label="Cost"
            value={csCost}
            icon={Wallet}
            isDropdown
            onPress={() => setCostModalVisible(true)}
          />

          <View style={styles.formItem}>
            <Text style={styles.modalParamsLabel}>Number of Passengers</Text>
            <View style={styles.modalInputContainer}>
              <View style={styles.valueRow}>
                <Users color="black" size={24} style={styles.formIcon} />
                <Text style={styles.valueText}>
                  {csPassengers} Passenger{csPassengers > 1 ? 's' : ''}
                </Text>
              </View>

              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={decrementCsPassengers}
                  style={styles.counterButton}
                >
                  <Minus color="black" size={16} />
                </TouchableOpacity>
                <Text style={styles.counterText}>{csPassengers}</Text>
                <TouchableOpacity
                  onPress={incrementCsPassengers}
                  style={styles.counterButton}
                >
                  <Plus color="black" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setChangeSearchModalVisible(false)}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  const renderCityModal = () => (
    <Modal
      visible={cityModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.cityModalHeader}>
          <TouchableOpacity onPress={() => setCityModalVisible(false)}>
            <X color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.cityModalTitle}>Select City or Airport</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.searchContainer}>
          <Search color="#666" size={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Select City or Airport"
            placeholderTextColor="#666"
            style={styles.searchInput}
            value={citySearchQuery}
            onChangeText={setCitySearchQuery}
          />
        </View>

        <ScrollView contentContainerStyle={styles.listContent}>
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
              onPress={() => handleCitySelect(`${item.city} (${item.code})`)}
            >
              <View style={styles.recentIconContainer}>
                {item.type === 'airport' ? (
                  <Plane color="black" size={20} />
                ) : (
                  <Building2 color="black" size={20} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.recentCity}>
                  {item.city}{' '}
                  <Text style={{ color: '#666' }}>({item.code})</Text>
                </Text>
                <Text style={styles.recentSubtext}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.separator} />

          <Text style={[styles.sectionTitle, styles.popularTitle]}>
            Popular Cities or Airport
          </Text>

          {/* Reusing Recent Item style for popular for now as list, or chips like before? 
              Image suggests a list for popular too. Let's use list. */}
          <View>
            {POPULAR_CITIES.map((city, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentItem}
                onPress={() => handleCitySelect(city)}
              >
                <View style={styles.recentIconContainer}>
                  {city.includes('Airport') ? (
                    <Plane color="black" size={20} />
                  ) : (
                    <Building2 color="black" size={20} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.recentCity}>{city}</Text>
                  {city.includes('Jakarta') ? (
                    <Text style={styles.recentSubtext}>Jakarta, Indonesia</Text>
                  ) : (
                    <Text style={styles.recentSubtext}>Malaysia</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {renderHeader()}
      <View style={styles.filterContainer}>{renderFilters()}</View>

      {activeTab === 'Product' ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderBanner()}
          <View style={styles.listContainer}>
            {PACKAGE_DATA.map(item => (
              <React.Fragment key={item.id}>
                {renderCard({ item })}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={VENDOR_DATA}
          keyExtractor={item => item.id}
          renderItem={renderVendorCard}
          numColumns={2}
          contentContainerStyle={styles.vendorGrid}
          columnWrapperStyle={styles.vendorColumnWrapper}
        />
      )}
      {renderChangesSearchModal()}
      {renderDepartureTimeModal()}
      {renderCostModal()}
      {renderCityModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: 'white',
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerSafeArea: {
    backgroundColor: 'white',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  backButton: {
    marginRight: spacing.m,
  },
  headerTexts: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  headerProperties: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    marginTop: 2,
  },
  changeButton: {
    backgroundColor: '#E0F2F1',
    paddingHorizontal: spacing.m,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changeButtonText: {
    color: '#20A39E',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#20A39E',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: '#666',
  },
  activeTabText: {
    color: '#20A39E',
    fontFamily: 'Inter_18pt-Bold',
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: spacing.s,
  },
  filtersScroll: {
    paddingHorizontal: spacing.m,
  },
  filtersContent: {
    paddingRight: spacing.m,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: spacing.s,
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
    color: colors.text,
    marginHorizontal: 4,
  },
  scrollContainer: {
    paddingBottom: spacing.xl,
  },
  bannerContainer: {
    padding: spacing.m,
  },
  bannerContent: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  bannerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#20A39E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.s,
  },
  percentageText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
  },
  bannerTextContainer: {
    flex: 1,
    marginRight: spacing.s,
  },
  bannerText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#92400E',
    lineHeight: 18,
  },
  boldText: {
    fontFamily: 'Inter_18pt-Bold',
  },
  copyText: {
    color: '#20A39E',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    textDecorationLine: 'underline',
  },
  listContainer: {
    paddingHorizontal: spacing.m,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: spacing.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageContainer: {
    height: 150,
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tagsContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  regularTag: {
    backgroundColor: '#8B5CF6',
  },
  cnhTag: {
    backgroundColor: '#EC4899',
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter_18pt-SemiBold',
  },
  vendorTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#20A39E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 12,
  },
  vendorText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
  },
  cardContent: {
    padding: spacing.m,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  addressIcon: {
    marginRight: 4,
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    marginRight: 8,
  },
  starsRow: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    marginRight: 1,
  },
  distanceText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
  },
  amenitiesRow: {
    flexDirection: 'row',
    marginBottom: spacing.m,
  },
  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  amenityText: {
    fontSize: 10,
    fontFamily: 'Inter_18pt-Medium',
    color: '#4B5563',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  seatsContainer: {
    flex: 1,
    marginRight: spacing.m,
  },
  progressBarBg: {
    height: 16,
    backgroundColor: '#E5E7EB', // Gray background
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 0,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#EF4444', // Red fill
  },
  seatsText: {
    fontSize: 10,
    fontFamily: 'Inter_18pt-Medium',
    color: 'white',
    position: 'absolute',
    top: 1, // Visually center in the 16px height
    left: 8,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  discountBadge: {
    backgroundColor: '#FECACA',
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  discountText: {
    fontSize: 10,
    fontFamily: 'Inter_18pt-Bold',
    color: '#EF4444',
  },
  finalPrice: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: '#D97706', // Orange-ish gold
  },
  taxText: {
    fontSize: 10,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
  },
  // Vendor Styles
  vendorGrid: {
    padding: spacing.m,
    paddingBottom: spacing.xl,
  },
  vendorColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.m,
  },
  vendorCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    width: '48%', // Approx half with spacing
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  vendorHeader: {
    marginBottom: spacing.m,
  },
  vendorLogoText: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Medium',
    color: '#20A39E',
  },
  vendorLogoTextDark: {
    fontFamily: 'Inter_18pt-Bold',
    color: '#20A39E', // Same color in logo but bolder
  },
  vendorLogoTextSmall: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#20A39E',
  },
  vendorTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.s,
  },
  vendorTagItem: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  vendorTagText: {
    fontSize: 8,
    fontFamily: 'Inter_18pt-Medium',
    color: '#4B5563',
  },
  vendorName: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 2,
  },
  vendorLocation: {
    fontSize: 10,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    marginBottom: spacing.s,
  },
  vendorRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  vendorRatingScore: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginLeft: 4,
  },
  vendorReviewCount: {
    fontSize: 10,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    marginLeft: 2,
  },
  vendorLicense: {
    fontSize: 9,
    fontFamily: 'Inter_18pt-Regular',
    color: '#9CA3AF',
    marginBottom: spacing.m,
  },
  vendorPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  vendorFromText: {
    fontSize: 10,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    marginRight: 4,
  },
  vendorPriceText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#D97706', // Orange/Gold
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.m,
    // No border bottom in the design provided, just 'X' 'Change Search'
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  modalContent: {
    padding: spacing.m,
  },
  formItem: {
    marginBottom: spacing.l,
    position: 'relative',
  },
  modalParamsLabel: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    position: 'absolute',
    top: -8,
    left: 12,
    zIndex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 4,
  },
  modalInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#9CA3AF', // Gray border
    borderRadius: 8,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    height: 56,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formIcon: {
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
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  counterButton: {
    paddingHorizontal: 8,
  },
  counterText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
    marginHorizontal: spacing.s,
    minWidth: 16,
    textAlign: 'center',
  },
  modalFooter: {
    padding: spacing.m,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  searchButton: {
    backgroundColor: '#20A39E',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
  // Date/Cost List Styles
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
  // City Modal Styles
  cityModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.m,
    backgroundColor: '#20A39E',
  },
  cityModalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'white',
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
    fontSize: 14,
    color: 'black',
    height: 48,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    marginTop: spacing.s,
    marginBottom: spacing.s,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#666',
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
    marginBottom: 8,
  },
  recentIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  recentCity: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  recentSubtext: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
  },
  separator: {
    height: 8,
    backgroundColor: '#F3F4F6',
    marginVertical: spacing.m,
  },
  popularTitle: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
  },
});
