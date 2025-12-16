import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

interface ServiceGridProps {
  onServicePress?: (id: string) => void;
  mode?: 'preview' | 'full';
}

export const ServiceGrid = ({
  onServicePress,
  mode = 'preview',
}: ServiceGridProps) => {
  const ALL_SERVICES = [
    {
      id: 'flight',
      label: 'Flight',
      image: require('../assets/icons/flight.png'),
      color: '#e8f3ee',
    },
    {
      id: 'hotel',
      label: 'Hotel',
      image: require('../assets/icons/hotel.png'),
      color: '#e8f3ee',
    },
    {
      id: 'umrah',
      label: 'Umrah',
      image: require('../assets/icons/umrah.png'),
      color: '#e8f3ee',
    },
    {
      id: 'mutawwif',
      label: 'Mutawwif',
      image: require('../assets/icons/mutawwif.png'),
      color: '#e8f3ee',
    },
    {
      id: 'quran',
      label: 'Al-Quran',
      image: require('../assets/icons/quran.png'),
      color: '#e8f3ee',
    },
    {
      id: 'kiblat',
      label: 'Kiblat',
      image: require('../assets/icons/kiblat.png'),
      color: '#e8f3ee',
    },
    {
      id: 'prayer',
      label: 'Prayer Times',
      image: require('../assets/icons/time.png'),
      color: '#e8f3ee',
    },
    {
      id: 'hijriah',
      label: 'Hijriah Calender',
      image: require('../assets/icons/hijrahcalendar.png'),
      color: '#e8f3ee',
    },
    {
      id: 'hajj',
      label: 'Hajj',
      image: require('../assets/icons/haji.png'),
      color: '#e8f3ee',
    },
  ];

  const services =
    mode === 'preview'
      ? [
          ...ALL_SERVICES.slice(0, 7),
          {
            id: 'others',
            label: 'Others',
            image: require('../assets/icons/appgrid.png'),
            color: '#e8f3ee',
          },
        ]
      : ALL_SERVICES;

  return (
    <View style={mode === 'full' ? styles.fullContainer : styles.container}>
      {services.map(service => {
        return (
          <TouchableOpacity
            key={service.id}
            style={styles.item}
            onPress={() => onServicePress?.(service.id)}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: service.color }]}
            >
              <Image
                source={service.image}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.label}>{service.label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.s, // Reduced padding to allow fitted items
  },
  fullContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.s,
  },
  item: {
    width: '25%', // Exactly 4 items per row
    alignItems: 'center',
    marginBottom: spacing.l,
    paddingHorizontal: 4, // Inner padding instead of gap
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 45, // Reduced icon size slightly to fit text
    height: 45,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
    textAlign: 'center',
  },
});
