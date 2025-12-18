import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';

// Auth Screens
import { SplashScreen } from '../screens/auth/SplashScreen';
import { LanguageSelectionScreen } from '../screens/auth/LanguageSelectionScreen';
import { LoginSelectionScreen } from '../screens/auth/LoginSelectionScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { OtpScreen } from '../screens/auth/OtpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Auth Flow - No Tabs */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelectionScreen}
        />
        <Stack.Screen name="LoginSelection" component={LoginSelectionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />

        {/* Main App - With Bottom Tabs */}
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
