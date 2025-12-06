import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

export const PromoSection = () => {
  const categories = ['All', 'Hajj Package', 'Umroh Package', 'Hotel', 'Flight'];
  
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
              index === 0 && styles.activeCategoryPill
            ]}
          >
            <Text style={[
              styles.categoryText,
              index === 0 && styles.activeCategoryText
            ]}>
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
        {/* Placeholder Promo Cards */}
        {[1, 2].map((item) => (
          <View key={item} style={styles.promoCard}>
            <View style={styles.promoContent}>
                <Text style={styles.promoTag}>ezumrah.com</Text>
                <Text style={styles.promoTitle}>{item === 1 ? 'UMRAH' : 'HAJI'}</Text>
                <Text style={styles.promoSubtitle}>Liburan Akhir Tahun 2025</Text>
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>Diskon+</Text>
                    <Text style={styles.cashbackText}>Cashback hingga</Text>
                </View>
            </View>
            {/* Background image placeholder would go here */}
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
    backgroundColor: '#5C6BC0', // Placeholder color
    borderRadius: spacing.m,
    marginRight: spacing.m,
    padding: spacing.m,
    overflow: 'hidden',
  },
  promoContent: {
      flex: 1,
  },
  promoTag: {
      backgroundColor: 'white',
      alignSelf: 'flex-start',
      paddingHorizontal: spacing.xs,
      borderRadius: 4,
      fontSize: 10,
      marginBottom: spacing.xs,
      color: '#5C6BC0',
  },
  promoTitle: {
      fontSize: 24,
      fontFamily: 'Inter_18pt-Bold',
      color: 'white',
  },
  promoSubtitle: {
      color: 'white',
      fontSize: 12,
      marginBottom: spacing.m,
  },
  discountBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      padding: spacing.s,
      borderRadius: spacing.s,
      alignSelf: 'flex-start',
  },
  discountText: {
      color: 'white',
      fontWeight: 'bold',
  },
  cashbackText: {
      color: 'white',
      fontSize: 10,
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
