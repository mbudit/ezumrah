import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Search, Bell, Percent, MapPin } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/theme';
import { ServiceGrid } from '../components/ServiceGrid';
import { PromoSection } from '../components/PromoSection';
import { HotelDealsSection } from '../components/HotelDealsSection';
import { NotificationCard } from '../components/NotificationCard';
import { BottomTabNavigator } from '../components/BottomTabNavigator';
import { ChatScreen } from './ChatScreen';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = React.useState<
    'Home' | 'Orders' | 'Wishlist' | 'Chat' | 'Profile'
  >('Home');

  const handleServicePress = (id: string) => {
    if (id === 'others') {
      navigation.navigate('AllProducts');
    } else if (id === 'umrah') {
      navigation.navigate('UmrahPackage');
    } else if (id === 'flight') {
      navigation.navigate('FlightSearch');
    }
  };

  const renderContent = () => {
    if (activeTab === 'Chat') {
      // ChatScreen needs to be refactored to accept navigation or we pass it here?
      // Since ChatScreen will be a child, it can use useNavigation hook or we can wrap it.
      // Or if it simply uses navigation prop, we can cast it or use useNavigation inside ChatScreen.
      // For now, let's assume ChatScreen uses useNavigation or similar.
      // Actually, ChatScreen was receiving onChatPress.
      // If ChatScreen lists chats, clicking one goes to ChatDetail.
      return <ChatScreen />;
    }

    if (activeTab === 'Home') {
      return (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Green Background with Curve */}
          <LinearGradient
            colors={['#20A39E', '#1D938E', '#1A827E', '#13625F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.greenBackground}
          >
            <SafeAreaView edges={['top']}>
              <View style={styles.header}>
                <View style={styles.searchContainer}>
                  <Search color="#20A39E" size={20} style={styles.searchIcon} />
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor={colors.textLight}
                    style={styles.searchInput}
                  />
                </View>
                <View style={styles.headerIcons}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('Notification')}
                  >
                    <Bell color="#20A39E" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('Voucher')}
                  >
                    <Percent color="#20A39E" size={20} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.heroContent}>
                <View style={styles.locationContainer}>
                  <MapPin color="red" size={16} />
                  <Text style={styles.locationText}>
                    Masjidil Haram, Makkah al-Mukarramah
                  </Text>
                </View>

                <Text style={styles.prayerName}>Subuh 04.46 WAS</Text>
                <Text style={styles.countdown}>— 05 : 25 : 22</Text>
                <Text style={styles.date}>
                  31 Agustus 2025 / 7 Rabiul Awal 1447
                </Text>
              </View>
            </SafeAreaView>
          </LinearGradient>

          <View style={styles.contentContainer}>
            <ServiceGrid onServicePress={handleServicePress} />
            <PromoSection />
            <NotificationCard />
            <HotelDealsSection />
          </View>
        </ScrollView>
      );
    }

    // Default placeholder for other tabs
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.text }}>Coming Soon</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={activeTab === 'Chat' ? 'dark-content' : 'light-content'}
        backgroundColor={activeTab === 'Chat' ? 'white' : '#20A39E'}
      />

      {renderContent()}

      <BottomTabNavigator activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  greenBackground: {
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: spacing.m,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l,
    marginTop: spacing.s,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: spacing.s,
    paddingHorizontal: spacing.s,
    height: 40,
    marginRight: spacing.m,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
    paddingVertical: 0, // Fix android text input padding
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.s,
  },
  heroContent: {
    alignItems: 'center',
    paddingBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  locationText: {
    color: 'white',
    marginLeft: spacing.xs,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 12,
  },
  prayerName: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    marginBottom: spacing.xs,
  },
  countdown: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    marginBottom: spacing.xs,
  },
  date: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    opacity: 0.9,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding for bottom tab
  },
  contentContainer: {
    paddingTop: spacing.m,
    marginTop: -80,
    zIndex: 10,
    elevation: 10,
  },
});
