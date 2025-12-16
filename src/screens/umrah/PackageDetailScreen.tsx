import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Share2,
  Heart,
  Check,
  BedDouble,
  CigaretteOff,
  MoreHorizontal,
  Star,
  MapPin,
  ChevronDown,
  Plane,
  TrainFront,
  Briefcase,
  Utensils,
  Building,
  X,
  ShoppingBag,
  Stethoscope,
  Wifi,
  ChefHat,
  Scissors,
  Luggage,
  Ticket,
  Armchair,
} from 'lucide-react-native';
import { colors, spacing } from '../../theme/theme';
// import { packageService } from '../services/packageService'; // Removed standard service usage
import { usePackageDetail } from '../../hooks/usePackageDetail';
// import { PackageDetail } from '../../types'; // Removed old type
import {
  PackageDetailExtended,
  ItineraryItem,
  Facility,
  Advantage,
} from '../../types/package';
import { ActivityIndicator } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PackageDetail'>;

export const PackageDetailScreen = ({ navigation }: Props) => {
  const [advantagesModalVisible, setAdvantagesModalVisible] =
    React.useState(false);
  const [facilitiesModalVisible, setFacilitiesModalVisible] =
    React.useState(false);
  const [itineraryModalVisible, setItineraryModalVisible] =
    React.useState(false);

  const [itinerarySelectedDay, setItinerarySelectedDay] =
    React.useState('Day 01');

  // Use Custom Hook
  const { data: packageDetail, isLoading: loading } = usePackageDetail('1');

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!packageDetail) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Package not found</Text>
      </View>
    );
  }

  // Derived data from hook
  const FLIGHT_DATA = packageDetail.flights;
  const ACCOMMODATION_DATA = packageDetail.hotels;
  const ADVANTAGES_DATA = packageDetail.advantages;
  const FACILITY_DATA = packageDetail.facilities;
  const FULL_FACILITY_DATA = packageDetail.fullFacilities;
  const ITINERARY_DATA = packageDetail.itinerary;
  const FULL_ITINERARY_DATA = packageDetail.fullItinerary;
  const FULL_ADVANTAGES_DATA = packageDetail.fullAdvantages;

  const renderFacilities = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Facility</Text>
        <TouchableOpacity onPress={() => setFacilitiesModalVisible(true)}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.facilitiesList}>
        {FACILITY_DATA.map(item => (
          <View key={item.id} style={styles.facilityItem}>
            <item.icon color="#555" size={24} style={styles.facilityIcon} />
            <Text style={styles.facilityTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderItinerary = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Itinerary</Text>
        <TouchableOpacity onPress={() => setItineraryModalVisible(true)}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itineraryList}>
        {ITINERARY_DATA.map((item, index) => (
          <View key={item.id} style={styles.itineraryRow}>
            {/* Day Column */}
            <View style={styles.dayColumn}>
              <Text style={styles.dayText}>{item.day}</Text>
              <Text style={styles.dayDateText}>{item.date}</Text>
            </View>

            {/* Icon Column */}
            <View style={styles.iconColumn}>
              <View style={styles.iconCircle}>
                <item.icon size={16} color="#555" />
              </View>
            </View>

            {/* Content Column */}
            <View style={styles.contentColumn}>
              {item.type === 'flight_card' ? (
                <View style={styles.itineraryCard}>
                  <View style={styles.itineraryCardHeader}>
                    <View style={styles.badgeLabel}>
                      <Text style={styles.badgeText}>{item.data.badge}</Text>
                    </View>
                    <Text style={styles.itineraryCardDate}>
                      {item.data.fullDate}
                    </Text>
                  </View>
                  <View style={styles.itineraryCardBody}>
                    <View style={styles.itTimeCol}>
                      <Text style={styles.itTimeText}>
                        {item.data.startTime}
                      </Text>
                      <View style={{ flex: 1 }} />
                      <Text style={styles.itTimeText}>{item.data.endTime}</Text>
                    </View>
                    <View style={styles.itLineCol}>
                      <View style={styles.itLine} />
                    </View>
                    <View style={styles.itDetailCol}>
                      <Text style={styles.itLocText}>{item.data.startLoc}</Text>
                      <View style={styles.itAirlineBlock}>
                        <Image
                          source={require('../../assets/logo/garuda.png')} // Reusing logo logic
                          style={styles.itAirlineLogo}
                        />
                        <Text style={styles.itAirlineName}>
                          {item.data.airline}
                        </Text>
                      </View>
                      <Text style={styles.itDurationText}>
                        {item.data.duration}
                      </Text>
                      <Text style={styles.itLocText}>{item.data.endLoc}</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.simpleItinerary}>
                  <Text style={styles.simpleTime}>{item.data.time}</Text>
                  <Text style={styles.simpleTitle}>{item.data.title}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAdvantages = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Advantages</Text>
        <TouchableOpacity onPress={() => setAdvantagesModalVisible(true)}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.advantagesList}>
        {ADVANTAGES_DATA.map(item => (
          <View key={item.id} style={styles.advantageItem}>
            <Image source={item.source} style={styles.advantageIcon} />
            <Text style={styles.advantageTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <View style={styles.priceContainer}>
        <Text style={styles.totalPriceLabel}>
          Total Price <Text style={styles.taxLabel}>(After Taxes)</Text>
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceValue}>$17.500</Text>
          <ChevronDown color="#333" size={20} style={{ marginLeft: 4 }} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => navigation.navigate('Booking')}
      >
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVendorInfo = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.vendorContainer}>
        <View style={styles.vendorHeader}>
          <Image
            source={packageDetail.vendorInfo.logo}
            style={styles.vendorLogo}
          />
          <View style={styles.vendorInfo}>
            <Text style={styles.vendorName}>
              {packageDetail.vendorInfo.name}
            </Text>
            <Text style={styles.vendorLocation}>
              {packageDetail.vendorInfo.location}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.visitButton}
            onPress={() => navigation.navigate('VendorDetail')}
          >
            <Text style={styles.visitButtonText}>Visit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.vendorStatsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {packageDetail.vendorInfo.rating}
            </Text>
            <Text style={styles.statLabel}>Review</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {packageDetail.vendorInfo.properties}
            </Text>
            <Text style={styles.statLabel}>Property</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {packageDetail.vendorInfo.chatReplied}
            </Text>
            <Text style={styles.statLabel}>Chat replied</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.imageContainer}>
      <Image
        source={require('../../assets/banner/umrah.png')}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.headerRightButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Heart color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Share2 color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );

  const renderFlightItem = (item: (typeof FLIGHT_DATA)[0]) => (
    <View key={item.id} style={styles.cardContainer}>
      {/* Vertical Label Strip */}
      <View style={styles.flightStrip}>
        <View style={[styles.verticalTextContainer, { width: 70 }]}>
          <Text style={styles.verticalText}>Flight</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.badgeLabel}>
            <Text style={styles.badgeText}>{item.type}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <View style={styles.flightRouteContainer}>
          {/* Time Column */}
          <View style={styles.timeColumn}>
            <Text style={styles.timeText}>{item.departureTime}</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.timeText}>{item.arrivalTime}</Text>
          </View>

          {/* Graphic Column */}
          <View style={styles.graphicColumn}>
            <Image
              source={require('../../assets/icons/plane_track.png')}
              style={{
                width: 24,
                height: 24,
                marginBottom: -4,
                zIndex: 1,
                resizeMode: 'contain',
              }}
            />
            <View style={styles.verticalLine} />
            <View style={styles.destinationDot} />
          </View>

          {/* Details Column */}
          <View style={styles.detailsColumn}>
            <Text style={styles.cityText}>{item.departureCity}</Text>

            <View style={styles.airlineInfoBlock}>
              <View style={styles.airlineRow}>
                <Image
                  source={require('../../assets/logo/garuda.png')}
                  style={styles.airlineLogo}
                />
                {item.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}> • verified</Text>
                    <Check color="#4ADE80" size={12} />
                  </View>
                )}
              </View>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>

            <Text style={styles.cityText}>{item.arrivalCity}</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.seeDetailsLink}>See Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAccommodationItem = (item: (typeof ACCOMMODATION_DATA)[0]) => (
    <View key={item.id} style={styles.cardContainer}>
      {/* Vertical Label Strip */}
      <View style={styles.accommodationStrip}>
        <View style={[styles.verticalTextContainer, { width: 120 }]}>
          <Text style={styles.verticalText}>Accommodation</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.badgeLabel}>
            <Text style={styles.badgeText}>{item.city}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.ratingRow}>
          {[...Array(item.rating)].map((_, i) => (
            <Star
              key={i}
              color="#FFC107"
              fill="#FFC107"
              size={12}
              style={{ marginRight: 2 }}
            />
          ))}
        </View>
        <Text style={styles.distanceText}>{item.distance}</Text>

        <View style={styles.amenitiesContainer}>
          <View style={styles.amenityRow}>
            <BedDouble color="#666" size={16} style={{ marginRight: 8 }} />
            <Text style={styles.amenityText}>{item.amenities[0]}</Text>
          </View>
          <View style={styles.amenityRow}>
            <CigaretteOff color="#666" size={16} style={{ marginRight: 8 }} />
            <Text style={styles.amenityText}>{item.amenities[1]}</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.seeDetailsLink}>See Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderHeader()}

        <View style={styles.contentHeader}>
          <Text style={styles.title}>Haji Plus 2027</Text>
        </View>

        <View style={styles.sectionContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollPadding}
          >
            {FLIGHT_DATA.map(renderFlightItem)}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollPadding}
          >
            {ACCOMMODATION_DATA.map(renderAccommodationItem)}
          </ScrollView>
        </View>

        {renderAdvantages()}
        {renderFacilities()}
        {renderItinerary()}
        {renderVendorInfo()}
      </ScrollView>
      {renderBottomBar()}
      <Modal
        animationType="slide"
        transparent={false}
        visible={advantagesModalVisible}
        onRequestClose={() => setAdvantagesModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setAdvantagesModalVisible(false)}>
              <X color="black" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Advantages</Text>
            <View style={{ width: 24 }} />
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {FULL_ADVANTAGES_DATA.map(item => (
              <View key={item.id} style={styles.fullAdvantageItem}>
                <View style={styles.fullAdvantageIconContainer}>
                  {item.type === 'image' ? (
                    <Image
                      source={item.source}
                      style={styles.fullAdvantageImage}
                    />
                  ) : (
                    <View
                      style={[
                        styles.fullAdvantageIconCircle,
                        { backgroundColor: item.bgColor },
                      ]}
                    >
                      {item.icon && <item.icon color={item.color} size={20} />}
                    </View>
                  )}
                </View>
                <View style={styles.fullAdvantageTextContainer}>
                  <Text style={styles.fullAdvantageTitle}>{item.title}</Text>
                  <Text style={styles.fullAdvantageDest}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={facilitiesModalVisible}
        onRequestClose={() => setFacilitiesModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setFacilitiesModalVisible(false)}>
              <X color="black" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Facilities</Text>
            <View style={{ width: 24 }} />
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {FULL_FACILITY_DATA.map(item => (
              <View key={item.id} style={styles.fullAdvantageItem}>
                <View style={styles.fullAdvantageIconContainer}>
                  <item.icon color="#555" size={24} />
                </View>
                <View style={styles.fullAdvantageTextContainer}>
                  <Text
                    style={[styles.fullAdvantageTitle, { marginBottom: 0 }]}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={itineraryModalVisible}
        onRequestClose={() => setItineraryModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setItineraryModalVisible(false)}>
              <X color="black" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Itinerary</Text>
            <View style={{ width: 24 }} />
          </View>
          {/* Day Tabs */}
          <View style={styles.dayTabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dayTabsContent}
            >
              {[
                'Day 01',
                'Day 02',
                'Day 03',
                'Day 04',
                'Day 05',
                'Day 06',
                'Day 07',
              ].map((day, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setItinerarySelectedDay(day)}
                  style={[
                    styles.dayTab,
                    itinerarySelectedDay === day && styles.dayTabActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayTabText,
                      itinerarySelectedDay === day && styles.dayTabTextActive,
                    ]}
                  >
                    {day}
                  </Text>
                  {itinerarySelectedDay === day && (
                    <View style={styles.dayTabIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            {FULL_ITINERARY_DATA.filter(
              item => item.dayId === itinerarySelectedDay,
            ).map((item, index) => (
              <View key={item.id} style={styles.itineraryRow}>
                {/* Day Column */}
                <View style={styles.dayColumn}>
                  <Text style={styles.dayText}>{item.day}</Text>
                  <Text style={styles.dayDateText}>{item.date}</Text>
                </View>

                {/* Icon Column */}
                <View style={styles.iconColumn}>
                  <View style={styles.iconCircle}>
                    <item.icon size={16} color="#555" />
                  </View>
                </View>

                {/* Content Column */}
                <View style={styles.contentColumn}>
                  {item.type === 'flight_card' ? (
                    <View style={styles.itineraryCard}>
                      <View style={styles.itineraryCardHeader}>
                        <View style={styles.badgeLabel}>
                          <Text style={styles.badgeText}>
                            {item.data.badge}
                          </Text>
                        </View>
                        <Text style={styles.itineraryCardDate}>
                          {item.data.fullDate}
                        </Text>
                      </View>
                      <View style={styles.itineraryCardBody}>
                        <View style={styles.itTimeCol}>
                          <Text style={styles.itTimeText}>
                            {item.data.startTime}
                          </Text>
                          <View style={{ flex: 1 }} />
                          <Text style={styles.itTimeText}>
                            {item.data.endTime}
                          </Text>
                        </View>
                        <View style={styles.itLineCol}>
                          <View style={styles.itLine} />
                        </View>
                        <View style={styles.itDetailCol}>
                          <Text style={styles.itLocText}>
                            {item.data.startLoc}
                          </Text>
                          <View style={styles.itAirlineBlock}>
                            <Image
                              source={require('../../assets/logo/garuda.png')} // Reusing logo logic
                              style={styles.itAirlineLogo}
                            />
                            <Text style={styles.itAirlineName}>
                              {item.data.airline}
                            </Text>
                          </View>
                          <Text style={styles.itDurationText}>
                            {item.data.duration}
                          </Text>
                          <Text style={styles.itLocText}>
                            {item.data.endLoc}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.simpleItinerary}>
                      <Text style={styles.simpleTime}>{item.data.time}</Text>
                      <Text style={styles.simpleTitle}>{item.data.title}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Layout seems to be on white based on card shadows
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
    marginBottom: spacing.m,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: spacing.m,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.s,
  },
  headerRightButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: spacing.m,
  },
  contentHeader: {
    paddingHorizontal: spacing.m,
    marginTop: spacing.m,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  sectionContainer: {
    marginTop: spacing.l,
  },
  horizontalScrollPadding: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.s, // Space for shadow
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: spacing.m,
    width: Dimensions.get('window').width * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    height: 230, // Fixed height to align strips
  },
  flightStrip: {
    width: 30,
    height: 70,
    backgroundColor: '#CA8A04', // Dark Yellow/Gold
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 12,
  },
  accommodationStrip: {
    width: 30,
    height: 120,
    backgroundColor: '#1E3A8A', // Dark Blue
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 12,
  },
  verticalTextContainer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-90deg' }],
  },
  verticalText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 12,
  },
  cardContent: {
    flex: 1,
    padding: spacing.m,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  badgeLabel: {
    backgroundColor: '#FEF3C7', // Light yellow
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: spacing.s,
  },
  badgeText: {
    color: '#D97706',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  flightRouteContainer: {
    flexDirection: 'row',
    marginBottom: spacing.s,
    height: 100, // Fixed height to help with layout alignment
  },
  timeColumn: {
    justifyContent: 'space-between',
    paddingVertical: 2,
    marginRight: spacing.s,
  },
  graphicColumn: {
    alignItems: 'center',
    marginRight: spacing.s,
    paddingTop: 4,
  },
  verticalLine: {
    width: 1,
    flex: 1,
    backgroundColor: '#bfebe9', // Light teal line
    marginVertical: 2,
  },
  destinationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#20A39E',
    marginBottom: 6,
  },
  detailsColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  airlineInfoBlock: {
    paddingVertical: 2,
  },
  airlineLogo: {
    width: 125,
    height: 35,
    resizeMode: 'contain',
    marginRight: 4,
    marginLeft: -4, // slight adjustment to align visual weight
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  airlineText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_18pt-Regular',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: '#4ADE80',
    fontFamily: 'Inter_18pt-Medium',
  },
  durationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cityText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  seeDetailsLink: {
    color: '#20A39E',
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    marginTop: spacing.s,
  },
  hotelName: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
    marginBottom: spacing.m,
  },
  amenitiesContainer: {
    marginBottom: spacing.s,
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  amenityText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter_18pt-Regular',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  seeAllText: {
    fontSize: 14,
    color: '#20A39E',
    fontFamily: 'Inter_18pt-Medium',
  },
  advantagesList: {
    paddingHorizontal: spacing.m,
  },
  advantageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  advantageIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: spacing.m,
  },
  advantageTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  facilitiesList: {
    paddingHorizontal: spacing.m,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  facilityIcon: {
    marginRight: spacing.m,
  },
  facilityTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.m,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingBottom: spacing.l, // Extra padding for safe area logic usually, or explicitly provided
  },
  priceContainer: {
    flex: 1,
  },
  totalPriceLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_18pt-Medium',
    marginBottom: 4,
  },
  taxLabel: {
    fontSize: 12,
    color: '#999',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceValue: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  orderButton: {
    backgroundColor: '#20A39E',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
  },
  itineraryList: {
    paddingHorizontal: spacing.m,
  },
  itineraryRow: {
    flexDirection: 'row',
    marginBottom: spacing.l,
  },
  dayColumn: {
    width: 60,
    alignItems: 'flex-start',
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  dayDateText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_18pt-Regular',
  },
  iconColumn: {
    width: 30,
    alignItems: 'center',
    marginRight: spacing.s,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0F2F1', // Light teal bg
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColumn: {
    flex: 1,
  },
  itineraryCard: {
    borderWidth: 1,
    borderColor: '#20A39E',
    borderRadius: 8,
    padding: spacing.m,
  },
  itineraryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  itineraryCardDate: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  itineraryCardBody: {
    flexDirection: 'row',
  },
  itTimeCol: {
    justifyContent: 'space-between',
    paddingVertical: 2,
    marginRight: 8,
  },
  itTimeText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter_18pt-Regular',
  },
  itLineCol: {
    width: 2,
    backgroundColor: '#bfebe9',
    marginRight: 8,
  },
  itLine: {
    flex: 1,
    backgroundColor: '#bfebe9',
  },
  itDetailCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itLocText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  itAirlineBlock: {
    marginVertical: 4,
  },
  itAirlineLogo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  itAirlineName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  itDurationText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  simpleItinerary: {
    minHeight: 40,
  },
  simpleTime: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 2,
  },
  simpleTitle: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_18pt-Regular',
    lineHeight: 20,
  },
  vendorContainer: {
    paddingHorizontal: spacing.m,
  },
  vendorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  vendorLogo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
    marginRight: spacing.m,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  vendorLocation: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_18pt-Regular',
  },
  visitButton: {
    backgroundColor: '#bfebe9',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  visitButtonText: {
    color: '#0D9488', // Darker Teal
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: spacing.m,
  },
  vendorStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.m,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_18pt-Regular',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  modalContent: {
    padding: spacing.m,
  },
  fullAdvantageItem: {
    flexDirection: 'row',
    marginBottom: spacing.l,
    alignItems: 'flex-start',
  },
  fullAdvantageIconContainer: {
    marginRight: spacing.m,
    paddingTop: 4,
  },
  fullAdvantageImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  fullAdvantageIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullAdvantageTextContainer: {
    flex: 1,
  },
  fullAdvantageTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
    marginBottom: 4,
  },
  fullAdvantageDest: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Inter_18pt-Regular',
    lineHeight: 20,
  },
  dayTabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: 'white',
  },
  dayTabsContent: {
    paddingHorizontal: spacing.m,
  },
  dayTab: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
    marginRight: spacing.m,
    alignItems: 'center',
    position: 'relative',
  },
  dayTabActive: {},
  dayTabText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#6B7280',
  },
  dayTabTextActive: {
    color: '#0D9488', // Teal
    fontFamily: 'Inter_18pt-Bold',
  },
  dayTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: spacing.s,
    right: spacing.s,
    height: 3,
    backgroundColor: '#0D9488',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});
