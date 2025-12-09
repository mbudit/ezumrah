import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Briefcase,
  Plane,
  ShieldCheck,
  PlusCircle,
  Luggage,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing } from '../theme/theme';

interface TripEnhanceScreenProps {
  onBackPress: () => void;
}

export const TripEnhanceScreen = ({ onBackPress }: TripEnhanceScreenProps) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enhance your trip</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Gold Banner */}
        <LinearGradient
          colors={['#7E5E04', '#DDB95B', '#7E5E04']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.banner}
        >
          <Text style={styles.bannerText}>Last stop to enhance your trip!</Text>
        </LinearGradient>

        {/* Travel Add-ons */}
        <Text style={styles.sectionTitle}>Travel Add-ons</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Luggage color="#D97706" size={24} style={styles.cardIcon} />
            <Text style={styles.cardDescription}>
              Clothes, souvenirs, shoes, and stuff. You sure 10 kg is enough?
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              From <Text style={styles.priceValue}>IDR 90.000</Text>/5 kg
            </Text>
            <TouchableOpacity>
              <PlusCircle color="#0D9488" size={24} fill="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Extra Protection */}
        <Text style={styles.sectionTitle}>Extra Protection</Text>

        {/* Flight Delay Insurance */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Plane color="#0D9488" size={20} />
            <Text style={styles.cardTitle}>Flight Delay Insurance</Text>
          </View>

          <View style={styles.benefitContainer}>
            <View style={styles.benefitRow}>
              <ShieldCheck color="#0D9488" size={16} />
              <Text style={styles.benefitText}>
                Get compensated if your flight delay above 90 minutes up to{' '}
                <Text style={styles.boldText}>IDR 600.000</Text>
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.moreBenefitText}>More Benefit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>
              IDR 76,700<Text style={styles.priceUnit}>/5 kg</Text>
            </Text>
            <TouchableOpacity>
              <PlusCircle color="#0D9488" size={24} fill="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Baggage Lost Insurance */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Briefcase color="#D97706" size={20} />
            <Text style={styles.cardTitle}>Baggage Lost Insurance</Text>
          </View>

          <View style={styles.benefitContainer}>
            <View style={styles.benefitRow}>
              <ShieldCheck color="#0D9488" size={16} />
              <Text style={styles.benefitText}>
                Lost or damaged baggage up to{' '}
                <Text style={styles.boldText}>IDR 5 million/item</Text>
              </Text>
            </View>
            <View style={styles.benefitRow}>
              <ShieldCheck color="#0D9488" size={16} />
              <Text style={styles.benefitText}>
                Repair cost <Text style={styles.boldText}>IDR 1 million</Text>
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.moreBenefitText}>More Benefit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>
              IDR 13.300<Text style={styles.priceUnit}>/5 kg</Text>
            </Text>
            <TouchableOpacity>
              <PlusCircle color="#0D9488" size={24} fill="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
    backgroundColor: '#FAFAFA',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  content: {
    padding: spacing.m,
  },
  banner: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    borderRadius: 20,
    marginBottom: spacing.l,
    alignSelf: 'flex-start', // Fit content
  },
  bannerText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.m,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.m,
  },
  cardIcon: {
    marginTop: 2,
  },
  cardDescription: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
    fontFamily: 'Inter_18pt-Regular',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    marginHorizontal: -spacing.m,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    marginBottom: -spacing.m,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  priceValue: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    color: '#0D9488',
  },
  priceUnit: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: '#333',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.m,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  benefitContainer: {
    backgroundColor: '#F0FDFA',
    padding: spacing.m,
    borderRadius: 8,
    marginBottom: spacing.m,
  },
  benefitRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  benefitText: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  boldText: {
    fontFamily: 'Inter_18pt-Bold',
  },
  moreBenefitText: {
    fontSize: 12,
    color: '#0D9488',
    textDecorationLine: 'underline',
    fontFamily: 'Inter_18pt-Medium',
    marginLeft: 24, // Align with text
  },
});
