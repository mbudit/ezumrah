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

function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showRegisterScreen, setShowRegisterScreen] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const backAction = () => {
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
        setIsLoggedIn(false);
        return true;
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
  }, [showOtpScreen, showRegisterScreen, showLoginScreen, isLoggedIn, isLanguageSelected]);

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
      setShowRegisterScreen(false); // Reset register state
      setShowLoginScreen(false); // Reset login state
  };

  const handleBackToLogin = () => {
      setShowRegisterScreen(false);
  };

  const handleBackFromOtp = () => {
      setShowOtpScreen(false);
      setShowLoginScreen(true);
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
            <LoginSelectionScreen onLogin={handleLoginSelection} onGuest={handleGuest} />
        )
      ) : (
        <HomeScreen />
      )}
    </SafeAreaProvider>
  );
}

export default App;
