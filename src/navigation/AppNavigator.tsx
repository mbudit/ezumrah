import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { LoginSelectionScreen } from '../screens/LoginSelectionScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { PromoCodeScreen } from '../screens/PromoCodeScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { AllProductsScreen } from '../screens/AllProductsScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ChatDetailScreen } from '../screens/ChatDetailScreen';
import { ChatRoomScreen } from '../screens/ChatRoomScreen';
import { UmrahSearchScreen } from '../screens/UmrahSearchScreen';
import { HajjSearchScreen } from '../screens/HajjSearchScreen';
import { VoucherScreen } from '../screens/VoucherScreen';
import { PackageListScreen } from '../screens/PackageListScreen';
import { VendorDetailScreen } from '../screens/VendorDetailScreen';
import { PackageDetailScreen } from '../screens/PackageDetailScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { PassengerDetailScreen } from '../screens/PassengerDetailScreen';
import { TripEnhanceScreen } from '../screens/TripEnhanceScreen';
import { OrderProcessingScreen } from '../screens/OrderProcessingScreen';
import { CompletePaymentScreen } from '../screens/CompletePaymentScreen';
import { PaymentMethodScreen } from '../screens/PaymentMethodScreen';
import { PaymentInstructionScreen } from '../screens/PaymentInstructionScreen';
import { FlightSearchScreen } from '../screens/FlightSearchScreen';
import { FlightResultsScreen } from '../screens/FlightResultsScreen';
import { FlightBookingScreen } from '../screens/FlightBookingScreen';
import { FlightCompleteBookingScreen } from '../screens/FlightCompleteBookingScreen';
import { HotelSearchScreen } from '../screens/HotelSearchScreen';
import { HotelResultsScreen } from '../screens/HotelResultsScreen';
import { OrderScreen } from '../screens/OrderScreen';
import { HistoryScreen } from '../screens/HistoryScreen'; // Import HistoryScreen

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
