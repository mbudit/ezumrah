import React from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { colors } from '../theme/theme';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#20A39E" barStyle="light-content" />
      <View style={styles.content}>
        <Image 
          source={require('../assets/logo/Logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20A39E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 195,
    height: 27,
  },
});
