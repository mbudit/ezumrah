import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

export const PromoSection = () => {
  const categories = [
    'All',
    'Hajj Package',
    'Umroh Package',
    'Hotel',
    'Flight',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lets check your promo before you go 🤩</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryPill,
              index === 0 && styles.activeCategoryPill,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                index === 0 && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.promosContainer}
      >
        {[1, 2].map(item => (
          <View key={item} style={styles.promoCard}>
            <Image
              source={require('../assets/banner/bannerrvoucher.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See all promos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: colors.text,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.l,
  },
  categoryPill: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.s,
    backgroundColor: colors.surface,
  },
  activeCategoryPill: {
    backgroundColor: '#E0F2F1', // Light green
    borderColor: '#20A39E',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
  },
  activeCategoryText: {
    color: '#20A39E',
    fontFamily: 'Inter_18pt-SemiBold',
  },
  promosContainer: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.l,
  },
  promoCard: {
    width: 280,
    height: 160,
    borderRadius: spacing.m,
    marginRight: spacing.m,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  seeAllButton: {
    marginHorizontal: spacing.m,
    backgroundColor: '#20A39E',
    padding: spacing.m,
    borderRadius: spacing.s,
    alignItems: 'center',
  },
  seeAllText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 16,
  },
});
