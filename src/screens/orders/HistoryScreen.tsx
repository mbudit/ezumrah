import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme/theme';

import { useOrderData } from '../../hooks/useOrderData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;

export const HistoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data, isLoading } = useOrderData();
  const HISTORY_DATA = data?.historyOrders || [];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Info color="#1C1C1E" size={20} style={{ marginRight: spacing.s }} />
          <Text style={styles.infoText}>
            Showing your history orders from the past 90 days
          </Text>
        </View>

        {/* History List */}
        {HISTORY_DATA.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardRow}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <Text style={styles.statusSuccess}>{item.status}</Text>
          </View>
        ))}
      </ScrollView>
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
    backgroundColor: 'white',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginLeft: spacing.s,
  },
  content: {
    padding: spacing.m,
  },
  infoBanner: {
    backgroundColor: '#E9F6F5', // Light teal/grayish as per image
    padding: spacing.m,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#1C1C1E', // Dark Gray
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: spacing.m,
    alignItems: 'center',
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: spacing.m,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: spacing.m,
  },
  statusSuccess: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#10B981', // Green
  },
});
