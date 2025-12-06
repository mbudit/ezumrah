import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/theme';

export const HotelDealsSection = () => {
  const hotels = [
    {
      id: 1,
      name: 'Makkah Clock Royal Tower A Fairmont Hotel',
      rating: 4.5,
      reviews: 312,
      originalPrice: 'IDR 5.100.736',
      price: 'IDR 3.825.552',
      image: 'https://placehold.co/600x400/png', // Placeholder
    },
    {
      id: 2,
      name: 'Makkah Clock Royal Tower A Fairmont Hotel',
      rating: 4.5,
      reviews: 312,
      originalPrice: 'IDR 5.100.736',
      price: 'IDR 3.825.552',
      image: 'https://placehold.co/600x400/png', // Placeholder
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[typography.h3, styles.title]}>Top hotel deals</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hotels.map((hotel) => (
          <TouchableOpacity key={hotel.id} style={styles.card}>
            <Image 
              source={{ uri: hotel.image }} 
              style={styles.image} 
              resizeMode="cover"
            />
            <View style={styles.content}>
              <Text style={styles.hotelName} numberOfLines={2}>
                {hotel.name}
              </Text>
              
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={12} 
                    color="#FFC107" 
                    fill={star <= Math.floor(hotel.rating) ? "#FFC107" : "transparent"} 
                    style={{ marginRight: 2 }}
                  />
                ))}
                <Text style={styles.ratingText}>
                  <Text style={styles.ratingScore}>{hotel.rating}/5</Text> ({hotel.reviews} review)
                </Text>
              </View>

              <Text style={styles.originalPrice}>{hotel.originalPrice}</Text>
              <Text style={styles.price}>{hotel.price}</Text>
              <Text style={styles.taxNote}>(Excluding taxes)</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.s, // Reduced margin
  },
  title: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
  },
  scrollContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.m, // Add padding for shadow/elevation
  },
  card: {
    width: 240,
    backgroundColor: 'white',
    borderRadius: spacing.m,
    marginRight: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#E0E0E0',
  },
  content: {
    padding: spacing.m,
  },
  hotelName: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: colors.text,
    marginBottom: spacing.s,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  ratingText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: spacing.xs,
    fontFamily: 'Inter_18pt-Regular',
  },
  ratingScore: {
    color: colors.text,
    fontFamily: 'Inter_18pt-Bold',
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textLight,
    textDecorationLine: 'line-through',
    marginBottom: 2,
    fontFamily: 'Inter_18pt-Regular',
  },
  price: {
    fontSize: 16,
    color: '#20A39E',
    fontFamily: 'Inter_18pt-Bold',
    marginBottom: 2,
  },
  taxNote: {
    fontSize: 10,
    color: colors.textLight,
    fontFamily: 'Inter_18pt-Regular',
  },
});
