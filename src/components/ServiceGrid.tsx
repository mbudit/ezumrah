import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

interface ServiceGridProps {
  onServicePress?: (id: string) => void;
}

export const ServiceGrid = ({ onServicePress }: ServiceGridProps) => {
  const services = [
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
      id: 'others',
      label: 'Others',
      image: require('../assets/icons/appgrid.png'),
      color: '#e8f3ee',
    },
  ];

  return (
    <View style={styles.container}>
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
            </View>
            <Text style={styles.label}>{service.label}</Text>
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
    justifyContent: 'space-between',
    padding: spacing.m,
  },
  item: {
    width: '23%', // 4 items per row
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  icon: {
    width: 48,
    height: 48,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
    textAlign: 'center',
  },
});
