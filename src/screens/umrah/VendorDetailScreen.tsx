import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  StatusBar,
  Dimensions,
  FlatList,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Search,
  MoreHorizontal,
  MessageSquare,
  MapPin,
  Star,
  X,
  ArrowUpDown,
  ChevronRight,
} from 'lucide-react-native';
import { spacing } from '../../theme/theme';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VendorDetail'>;

import { useVendorDetail } from '../../hooks/useVendorDetail';
import { VendorStaff, VendorReview, VendorProduct } from '../../types/vendor';

export const VendorDetailScreen = ({ navigation }: Props) => {
  const { data, isLoading } = useVendorDetail('1'); // Mock ID
  const [activeTab, setActiveTab] = useState('Vendor');
  const [staffModalVisible, setStaffModalVisible] = useState(false);

  // Use data from hook or empty arrays/defaults
  const MUTAWWIF_DATA = data?.mutawwif.slice(0, 4) || [];
  const MUTAWWIFAH_DATA = data?.mutawwifah.slice(0, 4) || [];
  const FULL_MUTAWWIF_DATA = data?.mutawwif || [];
  const FULL_MUTAWWIFAH_DATA = data?.mutawwifah || [];
  const REVIEWS_DATA = data?.reviews || [];
  const RECOMMENDED_DATA = data?.recommended || [];
  const PRODUCTS_DATA = data?.products || [];
  const CATEGORIES_DATA = data?.categories || [];
  const PRODUCT_FILTERS = data?.productFilters || [];
  const profile = data?.profile;

  const [staffType, setStaffType] = useState<'Mutawwif' | 'Mutawwifah'>(
    'Mutawwif',
  );
  const [activeProductFilter, setActiveProductFilter] = useState('Top Sales');

  const handleOpenStaff = (type: 'Mutawwif' | 'Mutawwifah') => {
    setStaffType(type);
    setStaffModalVisible(true);
  };

  const renderHeader = () => (
    <ImageBackground
      source={require('../../assets/banner/umrah.png')} // Fallback/Placeholder background
      style={styles.headerBackground}
    >
      <View style={styles.overlay} />
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft color="black" size={24} />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Search color="#666" size={20} style={styles.searchIcon} />
            <TextInput
              placeholder="Search in Vendor"
              placeholderTextColor="#666"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal color="black" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.vendorProfile}>
          <View style={styles.vendorLogoContainer}>
            <Image
              source={require('../../assets/logo/Logo2.png')}
              style={styles.vendorLogo}
            />
          </View>
          <View style={styles.vendorInfo}>
            <Text style={styles.vendorName}>Ezumrah</Text>
            <Text style={styles.vendorLocation}>Kuala Lumpur, Malaysia</Text>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <MessageSquare color="white" size={16} />
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {['Vendor', 'Products', 'Categories'].map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMutawwifList = (title: string, data: VendorStaff[]) => {
    const type = title.includes('Mutawwifah') ? 'Mutawwifah' : 'Mutawwif';
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity onPress={() => handleOpenStaff(type)}>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
        </View>
        {data.map(item => (
          <View key={item.id} style={styles.staffItem}>
            {/* Placeholder for staff avatar using icon if image fails */}
            <View style={styles.staffImageContainer}>
              <Image
                source={
                  type === 'Mutawwif'
                    ? require('../../assets/icons/vendor_mutawwif.png')
                    : require('../../assets/icons/vendor_mutawwifah.png')
                }
                style={styles.staffIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.staffName}>{item.name}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderReviews = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Review</Text>
        <TouchableOpacity>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </View>
      {REVIEWS_DATA.map(review => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View style={[styles.avatar, styles.greenAvatar]}>
              <Text style={styles.avatarText}>{review.initials}</Text>
            </View>
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewerName}>{review.name}</Text>
              <View style={styles.ratingRow}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    color="#FFC107"
                    fill="#FFC107"
                    size={14}
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      ))}
    </View>
  );

  const renderRecommended = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <TouchableOpacity>
          <Text style={styles.seeMoreText}>See more</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {RECOMMENDED_DATA.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.recommendCard}
            onPress={() => navigation.navigate('PackageDetail')}
          >
            <Image source={item.image} style={styles.recommendImage} />
            <View style={styles.recommendContent}>
              <Text style={styles.recommendTitle}>{item.title}</Text>
              <View style={styles.ratingRow}>
                {[...Array(Math.floor(item.rating))].map((_, i) => (
                  <Star
                    key={i}
                    color="#FFC107"
                    fill="#FFC107"
                    size={12}
                    style={{ marginRight: 1 }}
                  />
                ))}
                <Text style={styles.ratingCount}>
                  {item.rating}/5 ({item.reviews} review)
                </Text>
              </View>
              <Text style={styles.recommendOriginalPrice}>
                {item.originalPrice}
              </Text>
              <Text style={styles.recommendPrice}>{item.price}</Text>
              <Text style={styles.taxText}>(Excluding taxes)</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductFilters = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {PRODUCT_FILTERS.map(filter => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterChip,
            activeProductFilter === filter && styles.activeFilterChip,
            filter === 'Price' && styles.priceFilterChip,
          ]}
          onPress={() => setActiveProductFilter(filter)}
        >
          <Text
            style={[
              styles.filterText,
              activeProductFilter === filter && styles.activeFilterText,
              filter === 'Price' && styles.priceFilterText,
            ]}
          >
            {filter}
          </Text>
          {filter === 'Price' && (
            <ArrowUpDown color="#666" size={14} style={styles.priceIcon} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderProductGrid = () => (
    <View style={styles.productGrid}>
      {PRODUCTS_DATA.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.productCard}
          onPress={() => navigation.navigate('PackageDetail')}
        >
          <Image source={item.image} style={styles.productImage} />
          <View style={styles.productContent}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <View style={styles.ratingRow}>
              {[...Array(Math.floor(item.rating))].map((_, i) => (
                <Star
                  key={i}
                  color="#FFC107"
                  fill="#FFC107"
                  size={12}
                  style={{ marginRight: 1 }}
                />
              ))}
              <Text style={styles.ratingCount}>
                {item.rating}/5 ({item.reviews} review)
              </Text>
            </View>
            <Text style={styles.productOriginalPrice}>
              {item.originalPrice}
            </Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.taxText}>(Excluding taxes)</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      {CATEGORIES_DATA.map(item => (
        <TouchableOpacity key={item.id} style={styles.categoryItem}>
          <Text style={styles.categoryText}>
            {item.title}{' '}
            <Text style={styles.categoryCount}>({item.count})</Text>
          </Text>
          <ChevronRight color="#666" size={20} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStaffModal = () => (
    <Modal
      visible={staffModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setStaffModalVisible(false)}>
            <X color="black" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{staffType}</Text>
          <View style={{ width: 24 }} />
        </View>

        <FlatList
          data={
            staffType === 'Mutawwif' ? FULL_MUTAWWIF_DATA : FULL_MUTAWWIFAH_DATA
          }
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.modalStaffItem}>
              <View style={styles.modalStaffImageContainer}>
                <Image
                  source={
                    staffType === 'Mutawwif'
                      ? require('../../assets/icons/vendor_mutawwif.png')
                      : require('../../assets/icons/vendor_mutawwifah.png')
                  }
                  style={styles.modalStaffIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.modalStaffName}>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={styles.modalListContent}
        />
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderHeader()}
        {renderTabs()}

        {activeTab === 'Vendor' && (
          <View style={styles.tabContent}>
            {/* Profile Vendor Description */}
            <View style={[styles.section, { paddingTop: spacing.m }]}>
              <Text style={styles.sectionTitle}>Profile Vendor</Text>
              <Text style={styles.descriptionText}>{profile?.description}</Text>
              <Text style={styles.licenseText}>{profile?.license}</Text>
              <View style={styles.locationRow}>
                <MapPin color="#EF4444" size={16} style={{ marginRight: 8 }} />
                <Text style={styles.locationText}>{profile?.fullAddress}</Text>
              </View>
            </View>

            {renderMutawwifList('List of Mutawwif', MUTAWWIF_DATA)}
            {renderMutawwifList('List of Mutawwifah', MUTAWWIFAH_DATA)}
            {renderReviews()}
            {renderRecommended()}
          </View>
        )}

        {activeTab === 'Products' && (
          <View style={styles.tabContent}>
            {renderProductFilters()}
            {renderProductGrid()}
          </View>
        )}
        {activeTab === 'Categories' && (
          <View style={styles.tabContent}>{renderCategories()}</View>
        )}
      </ScrollView>
      {renderStaffModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  headerBackground: {
    width: '100%',
    paddingBottom: spacing.xl,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)', // Light overlay to make text readable/match design style showing some bg
  },
  headerSafeArea: {
    paddingHorizontal: spacing.m,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l,
    marginTop: spacing.xs,
  },
  backButton: {
    marginRight: spacing.s,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8,
    paddingHorizontal: spacing.s,
    height: 40,
    marginRight: spacing.s,
    borderWidth: 1,
    borderColor: '#9CA3AF',
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: 'black',
    paddingVertical: 0,
  },
  moreButton: {
    padding: 4,
  },
  vendorProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.s,
  },
  vendorLogoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
    overflow: 'hidden',
  },
  vendorLogo: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'white', // Looking at image, text seems white/light on dark bg or dark on light. Image shows dark bg part. Let's assume white for contrast on image
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
  },
  vendorLocation: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  chatButtonText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -15,
    overflow: 'hidden',
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
  tabContent: {
    backgroundColor: 'white',
  },
  section: {
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  seeMoreText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
    color: '#20A39E',
  },
  descriptionText: {
    fontSize: 13,
    fontFamily: 'Inter_18pt-Regular',
    color: '#374151',
    lineHeight: 20,
    marginBottom: spacing.s,
  },
  licenseText: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#D97706', // Gold/Yellowish
    marginBottom: spacing.s,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_18pt-Regular',
    color: '#374151',
    lineHeight: 18,
  },
  staffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  staffImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2F1', // Light teal
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  staffName: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  reviewCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.m,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  greenAvatar: {
    backgroundColor: '#10B981', // Green like 'SA' 'RA' in image
  },
  avatarText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 14,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#9CA3AF',
  },
  reviewText: {
    fontSize: 13,
    fontFamily: 'Inter_18pt-Regular',
    color: '#4B5563',
    lineHeight: 20,
  },
  recommendCard: {
    width: 160,
    marginRight: spacing.m,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  recommendImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  recommendContent: {
    padding: 8,
  },
  recommendTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
  },
  ratingCount: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
  },
  recommendOriginalPrice: {
    fontSize: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginTop: 4,
  },
  recommendPrice: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#20A39E',
  },
  taxText: {
    fontSize: 10,
    color: '#9CA3AF',
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
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  modalListContent: {
    padding: spacing.m,
  },
  modalStaffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  modalStaffImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#E0F2F1', // No bg needed for transparent png icon usually, or keep if preferred
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  staffIcon: {
    width: 40,
    height: 40,
  },
  modalStaffIcon: {
    width: 40,
    height: 40,
  },
  modalStaffName: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  filterContainer: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: spacing.s,
    backgroundColor: 'white',
  },
  activeFilterChip: {
    backgroundColor: '#E0F2F1', // Light teal bg
    borderColor: '#20A39E',
  },
  priceFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 13,
    fontFamily: 'Inter_18pt-Medium',
    color: '#666',
  },
  activeFilterText: {
    color: '#20A39E',
    fontFamily: 'Inter_18pt-Bold',
  },
  priceFilterText: {
    marginRight: 4,
  },
  priceIcon: {
    marginLeft: 2,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.m,
    justifyContent: 'space-between',
  },
  productCard: {
    width: (Dimensions.get('window').width - spacing.m * 3) / 2,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: spacing.m,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  productContent: {
    padding: 8,
  },
  productTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
    height: 40, // Fixed height for 2 lines title alignment
  },
  productOriginalPrice: {
    fontSize: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: '#20A39E',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    marginTop: spacing.s,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
  },
  categoryCount: {
    color: '#666',
  },
});
