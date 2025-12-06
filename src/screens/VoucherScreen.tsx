import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Percent, User } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, typography } from '../theme/theme';

interface VoucherScreenProps {
  onBackPress: () => void;
  onPromoPress: () => void;
}

const bannerImage = require('../assets/banner/bannerrvoucher.png');
const umrahIcon = require('../assets/icons/umrah.png');
const hotelIcon = require('../assets/icons/hotel.png');
const flightIcon = require('../assets/icons/flight.png');
const mutawwifIcon = require('../assets/icons/mutawwif.png');

const vouchers = [
  { id: '1', image: bannerImage },
  { id: '2', image: bannerImage },
  { id: '3', image: bannerImage },
  { id: '4', image: bannerImage },
];

const categories = [
  { id: 'all', label: 'All', icon: mutawwifIcon },
  { id: 'umrah', label: 'Umrah', icon: umrahIcon },
  { id: 'hotel', label: 'Hotel', icon: hotelIcon },
  { id: 'flight', label: 'Flight', icon: flightIcon },
];

export const VoucherScreen = ({
  onBackPress,
  onPromoPress,
}: VoucherScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const renderItem = ({ item }: { item: (typeof vouchers)[0] }) => (
    <View style={styles.bannerItem}>
      <Image
        source={item.image}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={['#20A39E', '#1D938E', '#1A827E', '#13625F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.greenHeader}
      >
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
              <Search
                color={colors.textLight}
                size={20}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search for Promos"
                placeholderTextColor={colors.textLight}
                style={styles.searchInput}
              />
            </View>
          </View>

          <View style={styles.headerTextContainer}>
            <View style={styles.textWrapper}>
              <Text style={styles.headerTitle}>
                Today’s special promo surprise
              </Text>
              <Text style={styles.headerSubtitle}>
                Lots of promotions for you
              </Text>
            </View>
            {/* Placeholder for illustration if needed, or just space */}
            <View style={styles.illustrationPlaceholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.promoInputContainer}>
        <TouchableOpacity
          style={styles.promoInputWrapper}
          onPress={onPromoPress}
        >
          <View style={styles.percentIconContainer}>
            <Percent color="white" size={12} />
          </View>
          <Text style={styles.promoInputText}>Got a promo code? Tap here</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryItem,
              selectedCategory === cat.id && styles.categoryItemActive,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <View style={styles.categoryIconWrapper}>
              {cat.id === 'all' ? (
                <View style={styles.userIconBg}>
                  <User color="white" size={20} fill="white" />
                </View>
              ) : (
                <Image
                  source={cat.icon}
                  style={styles.categoryIcon}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#20A39E" />
      <FlatList
        data={vouchers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    marginBottom: spacing.m,
  },
  greenHeader: {
    paddingBottom: spacing.l,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: spacing.m,
    minHeight: 255,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.s,
    marginBottom: spacing.l,
  },
  backButton: {
    marginRight: spacing.m,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: spacing.s,
    paddingHorizontal: spacing.s,
    height: 40,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
    paddingVertical: 0,
    fontSize: 14,
  },
  headerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingBottom: spacing.s,
  },
  textWrapper: {
    flex: 1,
    paddingRight: spacing.m,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Regular',
    color: 'white',
    opacity: 0.9,
  },
  illustrationPlaceholder: {
    width: 60,
    height: 60,
    // backgroundColor: 'rgba(255,255,255,0.2)', // Optional placeholder
  },
  promoInputContainer: {
    paddingHorizontal: spacing.m,
    marginTop: spacing.m,
  },
  promoInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20, // Pill shape
    padding: spacing.s,
    paddingHorizontal: spacing.m,
  },
  percentIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6B7280', // Dark gray
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.s,
  },
  promoInputText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.m,
    marginTop: spacing.l,
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
    padding: spacing.s,
    borderRadius: spacing.s,
    backgroundColor: '#F0FDF4', // Light green bg for items
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryItemActive: {
    borderColor: '#20A39E',
    backgroundColor: '#E6FFFA',
  },
  categoryIconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  userIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#20A39E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryLabel: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
    color: colors.text,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  bannerItem: {
    borderRadius: spacing.s,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    height: 193,
    marginHorizontal: spacing.m,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  separator: {
    height: spacing.m,
  },
});
