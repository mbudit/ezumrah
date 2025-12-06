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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const backAction = () => {
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
      if (showVoucherScreen) {
        setShowVoucherScreen(false);
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
      ) : showUmrahPackageScreen ? (
        <UmrahPackageScreen onBackPress={handleBackFromUmrah} />
      ) : showAllProductsScreen ? (
        <AllProductsScreen
          onClose={handleCloseAllProducts}
          onUmrahPress={handleUmrahPress}
        />
      ) : showChatDetailScreen ? (
        <ChatDetailScreen onBackPress={handleBackFromChatDetail} />
      ) : showPromoCodeScreen ? (
        <PromoCodeScreen onBackPress={handleBackFromPromo} />
      ) : showVoucherScreen ? (
        <VoucherScreen
          onBackPress={handleBackFromVoucher}
          onPromoPress={handlePromoPress}
        />
      ) : showNotificationScreen ? (
        <NotificationScreen onBackPress={handleBackFromNotification} />
      ) : (
        <HomeScreen
          onNotificationPress={handleNotificationPress}
          onVoucherPress={handleVoucherPress}
          onAllProductsPress={handleAllProductsPress}
          onChatPress={handleChatPress}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;
