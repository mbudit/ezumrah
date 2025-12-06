import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/theme';

interface AllProductsScreenProps {
  onClose: () => void;
  onUmrahPress?: () => void;
}

export const AllProductsScreen = ({
  onClose,
  onUmrahPress,
}: AllProductsScreenProps) => {
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

  const handlePress = (id: string) => {
    if (id === 'umrah') {
      onUmrahPress?.();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>All Products</Text>
      </View>

      {/* Grid */}
      <View style={styles.gridContainer}>
        {services.map(service => (
          <TouchableOpacity
            key={service.id}
            style={[styles.item, { backgroundColor: service.color }]}
            onPress={() => handlePress(service.id)}
          >
            <Image
              source={service.image}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.label}>{service.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
    marginBottom: spacing.s,
  },
  closeButton: {
    marginRight: spacing.m,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-SemiBold',
    color: 'black',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.m,
    justifyContent: 'space-between', // Distribute space evenly
  },
  item: {
    width: 90,
    height: 90,
    alignItems: 'center',
    marginBottom: spacing.s,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 4,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
    color: colors.text,
    textAlign: 'center',
  },
});
