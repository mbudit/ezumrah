import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Heart,
  Share2,
  ChevronDown,
  Briefcase,
  Check,
  Luggage, // Using Briefcase as proxy if Luggage not available in lucide-react-native standard set, checking imports
} from 'lucide-react-native';
import { colors, spacing } from '../../theme/theme';

// Interface for Flight Data (should potentially be shared)
interface FlightData {
  id: number;
  date: string;
  departureTime: string;
  departureCode: string;
  arrivalTime: string;
  arrivalCode: string;
  airline: string;
  class: string;
  price: string;
  duration: string;
  logo: any;
}

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useState } from 'react';
import { TicketOption } from '../../types/flight';

type Props = NativeStackScreenProps<RootStackParamList, 'FlightBooking'>;

const TICKET_OPTIONS = [
  {
    id: 1,
    type: 'Economy',
    price: 'IDR 604,400',
    baggage: '7 kg',
    cabin: '0 kg',
    benefits: [
      '100% Refund from original ticket price',
      'Reschedule fee IDR 291,600',
      'Travel Insurance',
    ],
  },
  {
    id: 2,
    type: 'Economy',
    price: 'IDR 750,000',
    baggage: '20 kg',
    cabin: '7 kg',
    benefits: [
      '100% Refund from original ticket price',
      'Reschedule fee IDR 291,600',
      'Travel Insurance',
      'Meal included',
    ],
  },
  {
    id: 3,
    type: 'Economy',
    price: 'IDR 950,000',
    baggage: '30 kg',
    cabin: '7 kg',
    benefits: [
      'Full Refund',
      'Free Reschedule',
      'Travel Insurance',
      'Meal included',
      'Lounge Access',
    ],
  },
];

export const FlightBookingScreen = ({ navigation, route }: Props) => {
  const { flight, searchParams } = route.params || {};
  const [selectedTicket, setSelectedTicket] = useState<TicketOption | null>(
    null,
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft color="black" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>K. Lumpur ➔ Singapore</Text>
            <Text style={styles.headerSubtitle}>
              1 Adult • {flight?.class || 'Economy'}
            </Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Heart color={colors.primary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Share2 color={colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Flight Summary Card */}
          <View style={styles.card}>
            <View style={styles.flightSummaryHeader}>
              <View style={styles.flightSummaryHeaderLeft}>
                <Text style={styles.summaryTag}>Depart</Text>
                <Text style={styles.summaryDate}>
                  Thu, 2 Oct • Economy • Direct
                </Text>
              </View>
              <ChevronDown size={20} color="#333" />
            </View>

            <View style={styles.timelineContainer}>
              {/* Timeline Line */}
              <View style={styles.timelineLineContainer}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineLine} />
                <View
                  style={[
                    styles.timelineDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
              </View>

              {/* Timeline Content */}
              <View style={styles.timelineContent}>
                {/* Departure */}
                <View style={styles.timelineItem}>
                  <View style={styles.timeWrapper}>
                    <Text style={styles.timeText}>
                      {flight?.departureTime || '06:45'}
                    </Text>
                    <Text style={styles.dateSmall}>02 Oct</Text>
                  </View>
                  <View style={styles.placeWrapper}>
                    <View style={styles.cityRow}>
                      <Text style={styles.cityText}>Kuala Lumpur</Text>
                      <View style={styles.codeTag}>
                        <Text style={styles.codeTagText}>
                          {flight?.departureCode || 'KUL'}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.airlineRow}>
                      <Image
                        source={
                          flight?.logo ||
                          require('../../assets/airlines/scoot.png')
                        }
                        style={styles.airlineLogo}
                      />
                      <Text style={styles.airlineName}>
                        {flight?.airline || 'Scoot'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Arrival */}
                <View style={[styles.timelineItem, { marginTop: spacing.l }]}>
                  <View style={styles.timeWrapper}>
                    <Text style={styles.timeText}>
                      {flight?.arrivalTime || '07:55'}
                    </Text>
                    <Text style={styles.dateSmall}>02 Oct</Text>
                  </View>
                  <View style={styles.placeWrapper}>
                    <View style={styles.cityRow}>
                      <Text style={styles.cityText}>Singapore</Text>
                      <View style={styles.codeTag}>
                        <Text style={styles.codeTagText}>
                          {flight?.arrivalCode || 'SIN'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Select your ticket</Text>

          {/* Ticket Options */}
          {TICKET_OPTIONS.map(ticket => (
            <TouchableOpacity
              key={ticket.id}
              style={[
                styles.ticketCard,
                selectedTicket?.id === ticket.id && styles.ticketCardSelected,
              ]}
              onPress={() => setSelectedTicket(ticket)}
            >
              <View style={styles.ticketHeader}>
                <View>
                  <Text style={styles.ticketClass}>{ticket.type}</Text>
                  <Text style={styles.ticketPrice}>
                    {ticket.price}
                    <Text style={styles.ticketPax}>/pax</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.dashedLine} />

              <View style={styles.benefitsContainer}>
                <View style={styles.benefitRow}>
                  <Image
                    source={require('../../assets/airlines/scoot.png')}
                    style={styles.iconCircle}
                    resizeMode="contain"
                  />
                  <View style={styles.baggageInfo}>
                    <Briefcase
                      size={16}
                      color="#555"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.benefitText}>{ticket.baggage}</Text>
                    <View style={{ width: 10 }} />
                    <Briefcase
                      size={16}
                      color="#555"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.benefitText}>{ticket.cabin}</Text>
                  </View>
                </View>

                {ticket.benefits.map((benefit, index) => (
                  <View key={index} style={styles.checkRow}>
                    <Check size={16} color="black" style={{ marginRight: 8 }} />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedTicket && styles.continueButtonDisabled,
            ]}
            onPress={() => {
              if (selectedTicket) {
                navigation.navigate('FlightCompleteBooking', {
                  flight,
                  ticket: selectedTicket,
                });
              }
            }}
            disabled={!selectedTicket}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 10,
  },
  backButton: {
    marginRight: spacing.m,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  iconButton: {
    marginLeft: spacing.s,
  },
  scrollContent: {
    padding: spacing.m,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.l,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 4,
    // elevation: 2,
  },
  flightSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.m,
  },
  flightSummaryHeaderLeft: {
    flex: 1,
  },
  summaryTag: {
    fontSize: 12,
    color: '#8A6F29', // Goldish/Brown
    fontWeight: 'bold',
    backgroundColor: '#FEF9E6',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  summaryDate: {
    fontSize: 13,
    color: '#555',
  },
  timelineContainer: {
    flexDirection: 'row',
  },
  timelineLineContainer: {
    width: 20,
    alignItems: 'center',
    paddingTop: 8,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: 'white',
    zIndex: 1,
  },
  timelineLine: {
    width: 1,
    backgroundColor: colors.primary,
    flex: 1,
    marginVertical: -2,
  },
  timelineContent: {
    flex: 1,
    marginLeft: spacing.s,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0, // spacing handles in margin top of second item
  },
  timeWrapper: {
    width: 50,
    marginRight: spacing.s,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  dateSmall: {
    fontSize: 11,
    color: '#999',
  },
  placeWrapper: {
    flex: 1,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cityText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginRight: spacing.s,
  },
  codeTag: {
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  codeTagText: {
    fontSize: 11,
    color: '#555',
    fontWeight: 'bold',
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  airlineLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 6,
  },
  airlineName: {
    fontSize: 13,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.m,
  },
  ticketCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  ticketCardSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: '#E6F6F6',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketClass: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  ticketPrice: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: '#D4AF37',
  },
  ticketPax: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#999',
  },
  dashedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
    borderRadius: 1,
    marginVertical: spacing.m,
  },
  benefitsContainer: {
    gap: 8,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  baggageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40, // align with text of first row (24 + 16 approx)
  },
  benefitText: {
    fontSize: 13,
    color: '#333',
  },
  footer: {
    padding: spacing.m,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  continueButtonText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 14,
  },
});
