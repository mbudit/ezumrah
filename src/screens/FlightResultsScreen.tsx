import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  SlidersHorizontal,
  ArrowUpDown,
  Calendar,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';

const DATES = [
  { day: 'Wed', date: '01 Oct 2025', price: 'IDR 412,000' },
  { day: 'Thu', date: '02 Oct 2025', price: 'IDR 417,000' },
  { day: 'Fri', date: '03 Oct 2025', price: 'IDR 419,000' },
  { day: 'Sat', date: '04 Oct 2025', price: 'IDR 410,000' },
];

const FLIGHTS = [
  {
    id: 1,
    date: '02 Oct 2025',
    departureTime: '06:45',
    departureCode: 'KUL',
    duration: '1h 10m',
    isDirect: true,
    arrivalTime: '07:45',
    arrivalCode: 'SIN',
    airline: 'Scoot',
    class: 'Economy',
    price: '417,100',
    nonRefundable: true,
    logo: require('../assets/airlines/scoot.png'),
  },
  {
    id: 2,
    date: '02 Oct 2025',
    departureTime: '09:00',
    departureCode: 'KUL',
    duration: '1h 10m',
    isDirect: true,
    arrivalTime: '10:10',
    arrivalCode: 'SIN',
    airline: 'AirAsia',
    class: 'Economy',
    price: '450,000',
    nonRefundable: false,
    logo: require('../assets/airlines/scoot.png'),
  },
  {
    id: 3,
    date: '03 Oct 2025',
    departureTime: '14:30',
    departureCode: 'KUL',
    duration: '1h 15m',
    isDirect: true,
    arrivalTime: '15:45',
    arrivalCode: 'SIN',
    airline: 'Malaysia Airlines',
    class: 'Economy',
    price: '520,000',
    nonRefundable: true,
    logo: require('../assets/airlines/scoot.png'),
  },
  {
    id: 4,
    date: '04 Oct 2025',
    departureTime: '18:00',
    departureCode: 'KUL',
    duration: '1h 05m',
    isDirect: true,
    arrivalTime: '19:05',
    arrivalCode: 'SIN',
    airline: 'Scoot',
    class: 'Economy',
    price: '390,000',
    nonRefundable: true,
    logo: require('../assets/airlines/scoot.png'),
  },
];

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlightResults'>;

export const FlightResultsScreen = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState(DATES[1].date); // Default to Thu 02 Oct

  const displayedFlights = FLIGHTS.filter(
    flight => flight.date === selectedDate,
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>Malaysia to Singapore</Text>
              <Text style={styles.tripDetailsText}>
                1 Pax • Thu, 2 Oct • Economy
              </Text>
            </View>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Date Strip */}
      <View style={styles.dateStripContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.calendarIconContainer}>
            <Calendar size={24} color={colors.primary} />
          </View>
          {DATES.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateItem,
                item.date === selectedDate && styles.dateItemSelected,
              ]}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text
                style={[
                  styles.dateTextDay,
                  item.date === selectedDate && styles.dateTextSelected,
                ]}
              >
                {item.day}, {item.date.split(', ')[1] || item.date}
              </Text>
              <Text
                style={[
                  styles.dateTextPrice,
                  item.date === selectedDate && styles.dateTextSelected,
                ]}
              >
                {item.price}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={16} color="white" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <ArrowUpDown size={16} color="white" />
          <Text style={styles.filterText}>Cheapest</Text>
        </TouchableOpacity>
      </View>

      {/* Flight List */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayedFlights.length > 0 ? (
          displayedFlights.map((flight, index) => (
            <TouchableOpacity
              key={index}
              style={styles.flightCard}
              onPress={() => navigation.navigate('FlightBooking', { flight })}
            >
              <View style={styles.flightMainRow}>
                <View style={styles.flightRouteContainer}>
                  <View>
                    <Text style={styles.timeText}>{flight.departureTime}</Text>
                    <Text style={styles.codeText}>{flight.departureCode}</Text>
                  </View>

                  <View style={styles.flightDurationContainer}>
                    <Text style={styles.durationText}>{flight.duration}</Text>
                    <View style={styles.durationLine} />
                    <Text style={styles.directText}>
                      {flight.isDirect ? 'Direct' : 'Stop'}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.timeText}>{flight.arrivalTime}</Text>
                    <Text style={styles.codeText}>{flight.arrivalCode}</Text>
                  </View>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>
                    IDR {flight.price}
                    <Text style={styles.paxText}>/pax</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.flightBottomRow}>
                <View style={styles.airlineInfo}>
                  {/* Placeholder for Airline Logo - using a View for now if image fails */}
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: '#FFD700',
                      marginRight: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      S
                    </Text>
                  </View>
                  <Text style={styles.airlineText}>
                    {flight.airline} · {flight.class}
                  </Text>
                </View>

                {flight.nonRefundable && (
                  <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>
                      Refund & reschedule not allowed
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noFlightsContainer}>
            <Text style={styles.noFlightsText}>
              No flights found for this date.
            </Text>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#20A39E', // Primary color based on previous screens
    paddingBottom: spacing.m,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingTop: spacing.s,
  },
  backButton: {
    padding: 8,
    marginRight: spacing.s,
  },
  routeContainer: {
    flex: 1,
  },
  routeText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    marginBottom: 2,
  },
  tripDetailsText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
  },
  changeButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium',
  },
  dateStripContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  calendarIconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  dateItem: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  dateItemSelected: {
    backgroundColor: '#E6F6F6', // Light teal bg
    borderBottomWidth: 2,
    borderBottomColor: '#20A39E',
  },
  dateTextDay: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  dateTextPrice: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
    color: '#333',
  },
  dateTextSelected: {
    color: '#20A39E',
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#20A39E',
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    justifyContent: 'space-between',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 13,
    fontFamily: 'Inter_18pt-Medium',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.m,
  },
  flightCard: {
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
  flightMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.l,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  codeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  flightRouteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightDurationContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.s,
  },
  durationText: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  durationLine: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
    marginBottom: 4,
  },
  directText: {
    fontSize: 11,
    color: '#999',
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: '#D4AF37', // Gold-ish color as per design
  },
  paxText: {
    fontSize: 11,
    color: '#999',
    fontWeight: 'normal',
  },
  flightBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airlineText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  tagContainer: {
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
  },
  noFlightsContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  noFlightsText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Medium',
    color: '#999',
    textAlign: 'center',
  },
});
