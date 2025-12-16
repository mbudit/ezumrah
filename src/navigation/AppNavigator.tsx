import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';

// Auth Screens
import { SplashScreen } from '../screens/auth/SplashScreen';
import { LanguageSelectionScreen } from '../screens/auth/LanguageSelectionScreen';
import { LoginSelectionScreen } from '../screens/auth/LoginSelectionScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { OtpScreen } from '../screens/auth/OtpScreen';

// Home Screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { AllProductsScreen } from '../screens/home/AllProductsScreen';

// Profile Screens
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';

// Umrah Screens
import { UmrahSearchScreen } from '../screens/umrah/UmrahSearchScreen';
import { PackageListScreen } from '../screens/umrah/PackageListScreen';
import { VendorDetailScreen } from '../screens/umrah/VendorDetailScreen';
import { PackageDetailScreen } from '../screens/umrah/PackageDetailScreen';

// Hajj Screens
import { HajjSearchScreen } from '../screens/hajj/HajjSearchScreen';

// Booking Screens
import { BookingScreen } from '../screens/booking/BookingScreen';
import { PassengerDetailScreen } from '../screens/booking/PassengerDetailScreen';
import { TripEnhanceScreen } from '../screens/booking/TripEnhanceScreen';
import { OrderProcessingScreen } from '../screens/booking/OrderProcessingScreen';

// Payment Screens
import { CompletePaymentScreen } from '../screens/payment/CompletePaymentScreen';
import { PaymentMethodScreen } from '../screens/payment/PaymentMethodScreen';
import { PaymentInstructionScreen } from '../screens/payment/PaymentInstructionScreen';

// Flight Screens
import { FlightSearchScreen } from '../screens/flight/FlightSearchScreen';
import { FlightResultsScreen } from '../screens/flight/FlightResultsScreen';
import { FlightBookingScreen } from '../screens/flight/FlightBookingScreen';
import { FlightCompleteBookingScreen } from '../screens/flight/FlightCompleteBookingScreen';

// Hotel Screens
import { HotelSearchScreen } from '../screens/hotel/HotelSearchScreen';
import { HotelResultsScreen } from '../screens/hotel/HotelResultsScreen';

// Chat Screens
import { ChatScreen } from '../screens/chat/ChatScreen';
import { ChatDetailScreen } from '../screens/chat/ChatDetailScreen';
import { ChatRoomScreen } from '../screens/chat/ChatRoomScreen';

// Order Screens
import { OrderScreen } from '../screens/orders/OrderScreen';
import { HistoryScreen } from '../screens/orders/HistoryScreen';

// Voucher Screens
import { VoucherScreen } from '../screens/vouchers/VoucherScreen';
import { PromoCodeScreen } from '../screens/vouchers/PromoCodeScreen';
import { NotificationScreen } from '../screens/vouchers/NotificationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash" // Start with Splash
        screenOptions={{
          headerShown: false, // Hide default header, screens have their own
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelectionScreen}
        />
        <Stack.Screen name="LoginSelection" component={LoginSelectionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Voucher" component={VoucherScreen} />
        <Stack.Screen name="PromoCode" component={PromoCodeScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="AllProducts" component={AllProductsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        <Stack.Screen name="UmrahSearch" component={UmrahSearchScreen} />
        <Stack.Screen name="HajjSearch" component={HajjSearchScreen} />
        <Stack.Screen name="PackageList" component={PackageListScreen} />
        <Stack.Screen name="VendorDetail" component={VendorDetailScreen} />
        <Stack.Screen name="PackageDetail" component={PackageDetailScreen} />

        {/* Booking & Payment Flow */}
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen
          name="PassengerDetail"
          component={PassengerDetailScreen}
        />
        <Stack.Screen name="TripEnhance" component={TripEnhanceScreen} />
        <Stack.Screen
          name="OrderProcessing"
          component={OrderProcessingScreen}
        />
        <Stack.Screen
          name="CompletePayment"
          component={CompletePaymentScreen}
        />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen
          name="PaymentInstruction"
          component={PaymentInstructionScreen}
        />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />

        {/* Flight Flow */}
        <Stack.Screen name="FlightSearch" component={FlightSearchScreen} />
        <Stack.Screen name="FlightResults" component={FlightResultsScreen} />
        <Stack.Screen name="FlightBooking" component={FlightBookingScreen} />
        <Stack.Screen
          name="FlightCompleteBooking"
          component={FlightCompleteBookingScreen}
        />
        <Stack.Screen name="HotelSearch" component={HotelSearchScreen} />
        <Stack.Screen name="HotelResults" component={HotelResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
