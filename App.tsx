import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { LanguageSelectionScreen } from './src/screens/LanguageSelectionScreen';
import { LoginSelectionScreen } from './src/screens/LoginSelectionScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { OtpScreen } from './src/screens/OtpScreen';
import { NotificationScreen } from './src/screens/NotificationScreen';
import { PromoCodeScreen } from './src/screens/PromoCodeScreen';
import { AllProductsScreen } from './src/screens/AllProductsScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { ChatDetailScreen } from './src/screens/ChatDetailScreen';
import { UmrahPackageScreen } from './src/screens/UmrahPackageScreen';
import { VoucherScreen } from './src/screens/VoucherScreen';
import { PackageListScreen } from './src/screens/PackageListScreen';
import { VendorDetailScreen } from './src/screens/VendorDetailScreen';
import { PackageDetailScreen } from './src/screens/PackageDetailScreen';
import { BookingScreen } from './src/screens/BookingScreen';
import { PassengerDetailScreen } from './src/screens/PassengerDetailScreen';
import { TripEnhanceScreen } from './src/screens/TripEnhanceScreen';
import { OrderProcessingScreen } from './src/screens/OrderProcessingScreen';
import { CompletePaymentScreen } from './src/screens/CompletePaymentScreen';
import { PaymentMethodScreen } from './src/screens/PaymentMethodScreen';
import { PaymentInstructionScreen } from './src/screens/PaymentInstructionScreen';
import { OrderHistoryScreen } from './src/screens/OrderHistoryScreen';
import { FlightSearchScreen } from './src/screens/FlightSearchScreen';
import { FlightResultsScreen } from './src/screens/FlightResultsScreen';
import { FlightBookingScreen } from './src/screens/FlightBookingScreen';

function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showRegisterScreen, setShowRegisterScreen] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showNotificationScreen, setShowNotificationScreen] = useState(false);
  const [showVoucherScreen, setShowVoucherScreen] = useState(false);
  const [showPromoCodeScreen, setShowPromoCodeScreen] = useState(false);
  const [showAllProductsScreen, setShowAllProductsScreen] = useState(false);
  const [showChatDetailScreen, setShowChatDetailScreen] = useState(false);
  const [showUmrahPackageScreen, setShowUmrahPackageScreen] = useState(false);
  const [showPackageListScreen, setShowPackageListScreen] = useState(false);
  const [showVendorDetailScreen, setShowVendorDetailScreen] = useState(false);
  const [showPackageDetailScreen, setShowPackageDetailScreen] = useState(false);
  const [showBookingScreen, setShowBookingScreen] = useState(false);
  const [showPassengerDetailScreen, setShowPassengerDetailScreen] =
    useState(false);
  const [showTripEnhanceScreen, setShowTripEnhanceScreen] = useState(false);
  const [showOrderProcessingScreen, setShowOrderProcessingScreen] =
    useState(false);
  const [showCompletePaymentScreen, setShowCompletePaymentScreen] =
    useState(false);
  const [showPaymentMethodScreen, setShowPaymentMethodScreen] = useState(false);
  const [showPaymentInstructionScreen, setShowPaymentInstructionScreen] =
    useState(false);
  const [showOrderHistoryScreen, setShowOrderHistoryScreen] = useState(false); /* State to manage which screen is visible */
  const [currentScreen, setCurrentScreen] = useState<'search' | 'results' | 'booking' | 'none'>('none');
  const [selectedFlight, setSelectedFlight] = useState<any>(null); // Using any for now to match FlightData
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  const handleOpenFlightSearch = () => {
    setCurrentScreen('search');
    // We also need to reset the flight flow state if needed, but 'search' is the start.
    // If this is called from Home, it starts the flow.
  };

  /* Flight Handlers managed by currentScreen state */
  const handleOpenFlightResults = () => {
    setCurrentScreen('results');
  };

  const handleCloseFlightResults = () => {
    setCurrentScreen('search');
  };

  const handleOpenBooking = (flight: any) => {
    setSelectedFlight(flight);
    setCurrentScreen('booking');
  };

  const handleCloseBooking = () => {
    setSelectedFlight(null);
    setCurrentScreen('results');
  };

  const handleCloseFlightSearch = () => {
    // Return to Home
    setCurrentScreen('none');
  };

  /* Handle Android Back Button */
  useEffect(() => {
    const onBackPress = () => {
      if (currentScreen === 'booking') {
        handleCloseBooking();
        return true;
      }
      if (currentScreen === 'results') {
        handleCloseFlightResults();
        return true;
      }
      if (currentScreen === 'search') {
        handleCloseFlightSearch();
        return true; // Prevent default behavior if needed, or false to exit
      }
      return false;
    };

    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandlerSubscription.remove();
  }, [currentScreen]);

  useEffect(() => {
    const backAction = () => {
      if (showVendorDetailScreen) {
        setShowVendorDetailScreen(false);
        return true;
      }
      if (showBookingScreen) {
        setShowBookingScreen(false);
        return true;
      }
      if (showVoucherScreen) {
        setShowVoucherScreen(false);
        return true;
      }
      if (showOrderHistoryScreen) {
        setShowOrderHistoryScreen(false);
        return true;
      }
      if (showPaymentInstructionScreen) {
        setShowPaymentInstructionScreen(false);
        return true;
      }
      if (showPaymentMethodScreen) {
        setShowPaymentMethodScreen(false);
        return true;
      }
      if (showCompletePaymentScreen) {
        setShowCompletePaymentScreen(false);
        return true;
      }
      if (showOrderProcessingScreen) {
        // Prevent back during processing or handle if needed
        return true;
      }
      if (showTripEnhanceScreen) {
        setShowTripEnhanceScreen(false);
        return true;
      }
      if (showPassengerDetailScreen) {
        setShowPassengerDetailScreen(false);
        return true;
      }
      if (showPackageDetailScreen) {
        setShowPackageDetailScreen(false);
        return true;
      }
      if (showPackageListScreen) {
        setShowPackageListScreen(false);
        return true;
      }
      if (showUmrahPackageScreen) {
        setShowUmrahPackageScreen(false);
        return true;
      }
      if (showChatDetailScreen) {
        setShowChatDetailScreen(false);
        return true;
      }
      if (showAllProductsScreen) {
        setShowAllProductsScreen(false);
        return true;
      }
      if (showPromoCodeScreen) {
        setShowPromoCodeScreen(false);
        return true;
      }
      if (showPromoCodeScreen) {
        setShowPromoCodeScreen(false);
        return true;
      }
      if (showNotificationScreen) {
        setShowNotificationScreen(false);
        return true;
      }
      if (showOtpScreen) {
        setShowOtpScreen(false);
        setShowLoginScreen(true);
        return true;
      }
      if (showRegisterScreen) {
        setShowRegisterScreen(false);
        return true;
      }
      if (showLoginScreen) {
        setShowLoginScreen(false);
        return true;
      }
      if (isLoggedIn) {
        return false;
      }
      if (isLanguageSelected) {
        setIsLanguageSelected(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [
    showOtpScreen,
    showRegisterScreen,
    showLoginScreen,
    isLoggedIn,
    isLanguageSelected,
    showNotificationScreen,
    showVoucherScreen,
    showPromoCodeScreen,
    showAllProductsScreen,
    showChatDetailScreen,
    showUmrahPackageScreen,
    showPackageListScreen,
    showPackageListScreen,
    showVendorDetailScreen,
    showPackageDetailScreen,
    showPassengerDetailScreen,
    showTripEnhanceScreen,
  ]);

  const handleLanguageSelect = (language: string) => {
    console.log('Selected language:', language);
    setIsLanguageSelected(true);
  };

  const handleLoginSelection = () => {
    console.log('Login selection pressed');
    setShowLoginScreen(true);
  };

  const handleLoginSuccess = () => {
    console.log('Login credentials accepted, showing OTP');
    setShowLoginScreen(false);
    setShowOtpScreen(true);
  };

  const handleOtpVerify = (code: string) => {
    console.log('OTP Verified:', code);
    setShowOtpScreen(false);
    setIsLoggedIn(true);
  };

  const handleGuest = () => {
    console.log('Guest pressed');
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    console.log('Register pressed');
    setShowRegisterScreen(true);
  };

  const handleSignUp = () => {
    console.log('Sign Up success');
    setIsLoggedIn(true);
    setShowRegisterScreen(false);
    setShowLoginScreen(false);
  };

  const handleBackToLogin = () => {
    setShowRegisterScreen(false);
  };

  const handleBackFromOtp = () => {
    setShowOtpScreen(false);
    setShowLoginScreen(true);
  };

  const handleNotificationPress = () => {
    setShowNotificationScreen(true);
  };

  const handleBackFromNotification = () => {
    setShowNotificationScreen(false);
  };

  const handleVoucherPress = () => {
    setShowVoucherScreen(true);
  };

  const handleBackFromVoucher = () => {
    setShowVoucherScreen(false);
  };

  const handlePromoPress = () => {
    setShowPromoCodeScreen(true);
  };

  const handleBackFromPromo = () => {
    setShowPromoCodeScreen(false);
  };

  const handleAllProductsPress = () => {
    setShowAllProductsScreen(true);
  };

  const handleCloseAllProducts = () => {
    setShowAllProductsScreen(false);
  };

  const handleChatPress = () => {
    setShowChatDetailScreen(true);
  };

  const handleBackFromChatDetail = () => {
    setShowChatDetailScreen(false);
  };

  const handleUmrahPress = () => {
    setShowUmrahPackageScreen(true);
  };

  const handleBackFromUmrah = () => {
    setShowUmrahPackageScreen(false);
  };

  const handleSearchPress = () => {
    setShowPackageListScreen(true);
  };

  const handleClosePackageList = () => {
    setShowPackageListScreen(false);
  };

  const handleOpenVendorDetail = () => {
    setShowVendorDetailScreen(true);
  };

  const handleCloseVendorDetail = () => {
    setShowVendorDetailScreen(false);
  };

  const handleOpenPackageDetail = () => {
    setShowPackageDetailScreen(true);
  };

  const handleClosePackageDetail = () => {
    setShowPackageDetailScreen(false);
  };

  /* Flight Handlers managed by currentScreen state at top of component */
  // handleOpenFlightSearch, handleCloseFlightSearch, etc are defined above.

  const handleOpenPassengerDetail = () => {
    setShowPassengerDetailScreen(true);
  };

  const handleClosePassengerDetail = () => {
    setShowPassengerDetailScreen(false);
  };

  const handleOpenTripEnhance = () => {
    setShowTripEnhanceScreen(true);
  };

  const handleCloseTripEnhance = () => {
    setShowTripEnhanceScreen(false);
  };

  const handleOpenOrderProcessing = () => {
    setShowTripEnhanceScreen(false);
    setShowOrderProcessingScreen(true);
  };

  const handleOrderProcessingComplete = () => {
    setShowOrderProcessingScreen(false);
    setShowCompletePaymentScreen(true);
  };

  const handleCloseCompletePayment = () => {
    setShowCompletePaymentScreen(false);
  };

  const handleOpenPaymentInstruction = () => {
    setShowPaymentInstructionScreen(true);
  };

  const handleClosePaymentInstruction = () => {
    setShowPaymentInstructionScreen(false);
  };

  const handleChangePaymentMethod = () => {
    setShowPaymentInstructionScreen(false);
    setShowPaymentMethodScreen(true);
  };

  const handleCheckStatus = () => {
    setShowOrderHistoryScreen(true);
  };

  const handleCloseOrderHistory = () => {
    setShowOrderHistoryScreen(false);
  };

  const handleOpenPaymentMethod = () => {
    setShowPaymentMethodScreen(true);
  };

  const handleClosePaymentMethod = () => {
    setShowPaymentMethodScreen(false);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodScreen(false);
  };

  const handleGoToHome = () => {
    setShowOrderHistoryScreen(false);
    setShowPaymentInstructionScreen(false);
    setShowCompletePaymentScreen(false);
    setShowOrderProcessingScreen(false);
    setShowTripEnhanceScreen(false);
    setShowPassengerDetailScreen(false);
    setShowBookingScreen(false);
    setShowPackageDetailScreen(false);
    setShowVendorDetailScreen(false);
    // setShowFlightResultsScreen(false); // Removed legacy
    // setShowFlightSearchScreen(false); // Removed legacy
    setCurrentScreen('none');
    // Reset any other flow screens if necessary
  };

  return (
    <SafeAreaProvider>
      {isShowSplash ? (
        <SplashScreen />
      ) : !isLanguageSelected ? (
        <LanguageSelectionScreen onSelectLanguage={handleLanguageSelect} />
      ) : !isLoggedIn ? (
        showOtpScreen ? (
          <OtpScreen onBack={handleBackFromOtp} onVerify={handleOtpVerify} />
        ) : showRegisterScreen ? (
          <RegisterScreen
            onLoginPress={handleBackToLogin}
            onSignUp={handleSignUp}
            onBack={handleBackToLogin}
          />
        ) : showLoginScreen ? (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onRegisterPress={handleRegister}
          />
        ) : (
          <LoginSelectionScreen
            onLogin={handleLoginSelection}
            onGuest={handleGuest}
          />
        )
      ) : showVoucherScreen ? (
        <VoucherScreen
          onBackPress={handleBackFromVoucher}
          onPromoPress={handlePromoPress}
        />
      ) : showVendorDetailScreen ? (
        <VendorDetailScreen
          onBackPress={handleCloseVendorDetail}
          onPackagePress={handleOpenPackageDetail}
        />
      ) : showTripEnhanceScreen ? (
        <TripEnhanceScreen
          onBackPress={handleCloseTripEnhance}
          onPromoPress={handleVoucherPress}
          onContinuePress={handleOpenOrderProcessing}
        />
      ) : showOrderProcessingScreen ? (
        <OrderProcessingScreen onComplete={handleOrderProcessingComplete} />
      ) : showOrderHistoryScreen ? (
        <OrderHistoryScreen
          onBackPress={handleCloseOrderHistory}
          onCompletePayment={() => setShowOrderHistoryScreen(false)}
          onHomePress={handleGoToHome}
        />
      ) : currentScreen === 'booking' && selectedFlight ? (
        <FlightBookingScreen
          onBackPress={handleCloseBooking}
          flight={selectedFlight}
        />
      ) : currentScreen === 'results' ? (
        <FlightResultsScreen
          onBackPress={handleCloseFlightResults}
          onFlightSelect={handleOpenBooking}
        />
      ) : currentScreen === 'search' ? (
        <FlightSearchScreen
          onBackPress={handleCloseFlightSearch}
          onSearchPress={handleOpenFlightResults}
        />
      ) : showPaymentInstructionScreen ? (
        <PaymentInstructionScreen
          onBackPress={handleClosePaymentInstruction}
          onChangePaymentMethod={handleChangePaymentMethod}
          onCheckStatus={handleCheckStatus}
          paymentMethod={selectedPaymentMethod}
        />
      ) : showPaymentMethodScreen ? (
        <PaymentMethodScreen
          onBackPress={handleClosePaymentMethod}
          onSelectMethod={handlePaymentMethodSelect}
          selectedMethod={selectedPaymentMethod}
        />
      ) : showCompletePaymentScreen ? (
        <CompletePaymentScreen
          onBackPress={handleCloseCompletePayment}
          onPaymentMethodPress={handleOpenPaymentMethod}
          onPayNow={handleOpenPaymentInstruction}
          selectedPaymentMethod={selectedPaymentMethod}
        />
      ) : showPassengerDetailScreen ? (
        <PassengerDetailScreen
          onBackPress={handleClosePassengerDetail}
          onContinuePress={handleOpenTripEnhance}
        />
      ) : showBookingScreen ? (
        <BookingScreen
          onBackPress={handleCloseBooking}
          onPassengerPress={handleOpenPassengerDetail}
        />
      ) : showPackageDetailScreen ? (
        <PackageDetailScreen
          onBackPress={handleClosePackageDetail}
          onVendorPress={handleOpenVendorDetail}
          onOrderPress={() => handleOpenBooking(null)}
        />
      ) : showPackageListScreen ? (
        <PackageListScreen
          onBackPress={handleClosePackageList}
          onVendorPress={handleOpenVendorDetail}
          onPackagePress={handleOpenPackageDetail}
        />
      ) : showUmrahPackageScreen ? (
        <UmrahPackageScreen
          onBackPress={handleBackFromUmrah}
          onSearchPress={handleSearchPress}
        />
      ) : showAllProductsScreen ? (
        <AllProductsScreen
          onClose={handleCloseAllProducts}
          onUmrahPress={handleUmrahPress}
        />
      ) : showChatDetailScreen ? (
        <ChatDetailScreen onBackPress={handleBackFromChatDetail} />
      ) : showPromoCodeScreen ? (
        <PromoCodeScreen onBackPress={handleBackFromPromo} />
      ) : showPromoCodeScreen ? (
        <PromoCodeScreen onBackPress={handleBackFromPromo} />
      ) : showNotificationScreen ? (
        <NotificationScreen onBackPress={handleBackFromNotification} />
      ) : (
        <HomeScreen
          onNotificationPress={handleNotificationPress}
          onVoucherPress={handleVoucherPress}
          onAllProductsPress={handleAllProductsPress}
          onChatPress={handleChatPress}
          onUmrahPress={handleUmrahPress}
          onFlightPress={handleOpenFlightSearch}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;
