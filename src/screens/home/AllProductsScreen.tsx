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
import { colors, spacing, typography } from '../../theme/theme';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AllProducts'>;

import { ServiceGrid } from '../../components/ServiceGrid';

export const AllProductsScreen = ({ navigation }: Props) => {
  // services array moved to ServiceGrid component

  const handlePress = (id: string) => {
    if (id === 'umrah') {
      navigation.navigate('UmrahSearch');
    } else if (id === 'hajj') {
      navigation.navigate('HajjSearch');
    } else if (id === 'flight') {
      navigation.navigate('FlightSearch');
    } else if (id === 'hotel') {
      navigation.navigate('HotelSearch');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <X color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>All Products</Text>
      </View>

      {/* Grid */}
      <ServiceGrid mode="full" onServicePress={handlePress} />
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
});
