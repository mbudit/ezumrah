import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Home,
  FileText,
  Heart,
  MessageSquare,
  User,
} from 'lucide-react-native';
import { colors } from '../theme/theme';

// Home Stack Screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { AllProductsScreen } from '../screens/home/AllProductsScreen';
import { UmrahSearchScreen } from '../screens/umrah/UmrahSearchScreen';
import { HajjSearchScreen } from '../screens/hajj/HajjSearchScreen';
import { PackageListScreen } from '../screens/umrah/PackageListScreen';
import { VendorDetailScreen } from '../screens/umrah/VendorDetailScreen';
import { PackageDetailScreen } from '../screens/umrah/PackageDetailScreen';
import { BookingScreen } from '../screens/booking/BookingScreen';
import { PassengerDetailScreen } from '../screens/booking/PassengerDetailScreen';
import { TripEnhanceScreen } from '../screens/booking/TripEnhanceScreen';
import { OrderProcessingScreen } from '../screens/booking/OrderProcessingScreen';
import { CompletePaymentScreen } from '../screens/payment/CompletePaymentScreen';
import { PaymentMethodScreen } from '../screens/payment/PaymentMethodScreen';
import { PaymentInstructionScreen } from '../screens/payment/PaymentInstructionScreen';
import { FlightSearchScreen } from '../screens/flight/FlightSearchScreen';
import { FlightResultsScreen } from '../screens/flight/FlightResultsScreen';
import { FlightBookingScreen } from '../screens/flight/FlightBookingScreen';
import { FlightCompleteBookingScreen } from '../screens/flight/FlightCompleteBookingScreen';
import { HotelSearchScreen } from '../screens/hotel/HotelSearchScreen';
import { HotelResultsScreen } from '../screens/hotel/HotelResultsScreen';
import { VoucherScreen } from '../screens/vouchers/VoucherScreen';
import { PromoCodeScreen } from '../screens/vouchers/PromoCodeScreen';
import { NotificationScreen } from '../screens/vouchers/NotificationScreen';

// Chat Stack Screens
import { ChatScreen } from '../screens/chat/ChatScreen';
import { ChatRoomScreen } from '../screens/chat/ChatRoomScreen';
import { ChatDetailScreen } from '../screens/chat/ChatDetailScreen';

// Profile Stack Screens
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';

// Order Stack Screens
import { OrderScreen } from '../screens/orders/OrderScreen';
import { HistoryScreen } from '../screens/orders/HistoryScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const WishlistStack = createNativeStackNavigator();

// Home Stack Navigator
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen as any} />
      <HomeStack.Screen
        name="AllProducts"
        component={AllProductsScreen as any}
      />
      <HomeStack.Screen
        name="UmrahSearch"
        component={UmrahSearchScreen as any}
      />
      <HomeStack.Screen name="HajjSearch" component={HajjSearchScreen as any} />
      <HomeStack.Screen
        name="PackageList"
        component={PackageListScreen as any}
      />
      <HomeStack.Screen
        name="VendorDetail"
        component={VendorDetailScreen as any}
      />
      <HomeStack.Screen
        name="PackageDetail"
        component={PackageDetailScreen as any}
      />
      <HomeStack.Screen name="Booking" component={BookingScreen as any} />
      <HomeStack.Screen
        name="PassengerDetail"
        component={PassengerDetailScreen as any}
      />
      <HomeStack.Screen
        name="TripEnhance"
        component={TripEnhanceScreen as any}
      />
      <HomeStack.Screen
        name="OrderProcessing"
        component={OrderProcessingScreen as any}
      />
      <HomeStack.Screen
        name="CompletePayment"
        component={CompletePaymentScreen as any}
      />
      <HomeStack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen as any}
      />
      <HomeStack.Screen
        name="PaymentInstruction"
        component={PaymentInstructionScreen as any}
      />
      <HomeStack.Screen
        name="FlightSearch"
        component={FlightSearchScreen as any}
      />
      <HomeStack.Screen
        name="FlightResults"
        component={FlightResultsScreen as any}
      />
      <HomeStack.Screen
        name="FlightBooking"
        component={FlightBookingScreen as any}
      />
      <HomeStack.Screen
        name="FlightCompleteBooking"
        component={FlightCompleteBookingScreen as any}
      />
      <HomeStack.Screen
        name="HotelSearch"
        component={HotelSearchScreen as any}
      />
      <HomeStack.Screen
        name="HotelResults"
        component={HotelResultsScreen as any}
      />
      <HomeStack.Screen name="Voucher" component={VoucherScreen as any} />
      <HomeStack.Screen name="PromoCode" component={PromoCodeScreen as any} />
      <HomeStack.Screen
        name="Notification"
        component={NotificationScreen as any}
      />
    </HomeStack.Navigator>
  );
}

// Orders Stack Navigator
function OrdersStackNavigator() {
  return (
    <OrdersStack.Navigator screenOptions={{ headerShown: false }}>
      <OrdersStack.Screen name="OrderList" component={OrderScreen as any} />
      <OrdersStack.Screen name="History" component={HistoryScreen as any} />
    </OrdersStack.Navigator>
  );
}

// Wishlist Stack Navigator (Placeholder)
function WishlistStackNavigator() {
  const WishlistPlaceholder = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Wishlist Coming Soon</Text>
    </View>
  );

  return (
    <WishlistStack.Navigator screenOptions={{ headerShown: false }}>
      <WishlistStack.Screen
        name="WishlistMain"
        component={WishlistPlaceholder}
      />
    </WishlistStack.Navigator>
  );
}

// Chat Stack Navigator
function ChatStackNavigator() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatList" component={ChatScreen as any} />
      <ChatStack.Screen name="ChatRoom" component={ChatRoomScreen as any} />
      <ChatStack.Screen name="ChatDetail" component={ChatDetailScreen as any} />
    </ChatStack.Navigator>
  );
}

// Profile Stack Navigator
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileScreen as any}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen as any}
      />
    </ProfileStack.Navigator>
  );
}

// Main Tab Navigator
export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_18pt-Regular',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FileText color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MessageSquare color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
