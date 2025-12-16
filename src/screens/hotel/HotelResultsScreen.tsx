import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  SlidersHorizontal,
  ArrowUpDown,
  Map,
  Star,
  MapPin,
  Share2,
  Heart,
  Building,
  Tag,
} from 'lucide-react-native';
import { colors, spacing } from '../../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// Mock Data
const HOTELS = [
  {
    id: '1',
    name: 'Al Safwah Orchid',
    distance: "500m from Ka'bah",
    rating: 5.0,
    reviewCount: '1.538',
    price: 'IDR 990,000',
    originalPrice: 'IDR 1.100.000',
    discount: '-4%',
    images: [
      require('../../assets/banner/hotel2.jpg'),
      require('../../assets/banner/hotel.png'),
    ],
    benefits: '100% Refund & Reschedule • Free Breakfast',
  },
  {
    id: '2',
    name: 'Pullman ZamZam Makkah',
    distance: "100m from Ka'bah",
    rating: 5.0,
    reviewCount: '2.300',
    price: 'IDR 2,450,000',
    originalPrice: 'IDR 2.650.000',
    discount: '-8%',
    images: [
      require('../../assets/banner/hotel2.jpg'),
      require('../../assets/banner/hotel.png'),
    ],
    benefits: 'Free Cancellation • Breakfast Included',
  },
  {
    id: '3',
    name: 'Swissôtel Makkah',
    distance: "200m from Ka'bah",
    rating: 4.8,
    reviewCount: '980',
    price: 'IDR 3,100,000',
    originalPrice: 'IDR 3.500.000',
    discount: '-10%',
    images: [
      require('../../assets/banner/hotel2.jpg'),
      require('../../assets/banner/hotel.png'),
    ],
    benefits: 'Direct Haram Access',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'HotelResults'>;

const HotelCard = ({ item }: { item: (typeof HOTELS)[0] }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const cardWidth = Dimensions.get('window').width - spacing.m * 2; // Calculate card width based on screen width and padding

  const onMomentumScrollEnd = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setActiveSlide(pageNum);
  };

  return (
    <View style={styles.hotelCard}>
      {/* Image Carousel */}
      <View style={styles.imageContainer}>
        <FlatList
          data={item.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          renderItem={({ item: img }) => (
            <Image
              source={img}
              style={[styles.cardImage, { width: cardWidth }]}
              resizeMode="cover"
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {item.images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                activeSlide === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          ))}
        </View>

        <View style={styles.imageOverlayIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Share2 color="black" size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Heart color="black" size={16} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardContent}>
        {/* Title & Review Row */}
        <View style={styles.titleRow}>
          <Text style={styles.hotelName}>{item.name}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount} Review)</Text>
        </View>

        {/* Rating & Distance Row */}
        <View style={styles.ratingRow}>
          <Building size={14} color="#666" style={{ marginRight: 4 }} />
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
            ))}
          </View>
          <Text style={styles.distanceText}> • {item.distance}</Text>
        </View>

        <Text style={styles.benefitsText}>{item.benefits}</Text>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          <View style={styles.discountRow}>
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
          </View>
          <Text style={styles.priceText}>{item.price}</Text>
          <Text style={styles.taxText}>(Including taxes)</Text>
        </View>
      </View>
    </View>
  );
};

export const HotelResultsScreen = ({ navigation, route }: Props) => {
  const { searchParams } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <ArrowLeft color="black" size={24} />
            </TouchableOpacity>
            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>
                {searchParams?.selectedLocation || 'Al Haram'} (30 Properti)
              </Text>
              <Text style={styles.tripDetailsText}>
                {searchParams?.selectedDate || '23 - 24 Okt'} • 1 Night •{' '}
                {searchParams?.guestData?.rooms || 1} Room
              </Text>
            </View>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.activeTab}>
              <Text style={styles.activeTabText}>Product</Text>
              <View style={styles.activeTabLine} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inactiveTab}>
              <Text style={styles.inactiveTabText}>Vendor</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity style={styles.filterAction}>
            <ArrowUpDown size={16} color="#666" />
            <Text style={styles.filterActionText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterAction}>
            <SlidersHorizontal size={16} color="#666" />
            <Text style={styles.filterActionText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Star</Text>
            <Text style={{ color: '#666', fontSize: 10, marginLeft: 4 }}>
              ▼
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Rating</Text>
            <Text style={{ color: '#666', fontSize: 10, marginLeft: 4 }}>
              ▼
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Price</Text>
            <Text style={{ color: '#666', fontSize: 10, marginLeft: 4 }}>
              ▼
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Hotel List */}
      <FlatList
        data={HOTELS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.codeBanner}>
            <View style={styles.tagIconContainer}>
              <Tag size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <Text style={styles.codeText}>
                Claim the code{' '}
                <Text style={{ fontWeight: 'bold' }}>STAYIN</Text> and save up
                to IDR 100,000 on your first hotel booking.
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.claimText}>Claim</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => <HotelCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingTop: spacing.s,
    marginBottom: spacing.m,
  },
  backButton: {
    padding: 8,
    marginRight: spacing.s,
    marginLeft: -8,
  },
  routeContainer: {
    flex: 1,
  },
  routeText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    marginBottom: 2,
  },
  tripDetailsText: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
  },
  changeButton: {
    backgroundColor: '#C5EBE9', // Light teal button bg
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeButtonText: {
    color: colors.primary,
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 12,
  },
  // Tabs
  tabContainer: {
    flexDirection: 'row',
    marginTop: spacing.s,
    paddingHorizontal: spacing.m,
  },
  activeTab: {
    marginRight: 24,
    paddingBottom: 12,
    alignItems: 'center',
  },
  activeTabText: {
    color: '#444',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 14,
  },
  activeTabLine: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: colors.primary,
    width: '120%', // Wider than text
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  inactiveTab: {
    marginRight: 24,
    paddingBottom: 12,
    alignItems: 'center',
  },
  inactiveTabText: {
    color: colors.primary,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 14,
  },

  // Filter Bar
  filterBar: {
    backgroundColor: 'white',
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterContent: {
    paddingHorizontal: spacing.m,
    gap: 12,
    alignItems: 'center',
  },
  filterAction: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  filterActionText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  filterChipText: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'Inter_18pt-Medium',
  },

  // Banner
  codeBanner: {
    backgroundColor: '#FDF5D3', // Beige/Yellow
    marginBottom: spacing.m,
    borderRadius: 12,
    padding: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    //   transform: [{rotate: '90deg'}] // Icon rotated in view
  },
  codeText: {
    fontSize: 12,
    color: '#4A3B18', // Dark brownish text
    lineHeight: 18,
  },
  claimText: {
    color: colors.primary,
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  listContent: {
    padding: spacing.m,
  },
  hotelCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: spacing.m,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180, // Taller image
  },
  imageOverlayIcons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  // Pagination
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  paginationDotActive: {
    backgroundColor: 'white',
    width: 8,
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  cardContent: {
    padding: spacing.m,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  hotelName: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    flex: 1,
  },
  reviewCount: {
    fontSize: 12,
    color: '#888',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
  },
  benefitsText: {
    fontSize: 12,
    color: '#666',
    marginBottom: spacing.m,
  },

  // Price Section
  priceContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FDE68A', // Pale yellow/beige
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    color: '#D32F2F', // Red for discount
    fontFamily: 'Inter_18pt-Bold',
  },
  priceText: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: '#D4AF37', // Gold/Yellow ish
  },
  taxText: {
    fontSize: 10,
    color: '#999',
  },
});
