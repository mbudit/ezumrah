import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';
import { Button } from '../components/Button';

interface LoginSelectionScreenProps {
  onLogin: () => void;
  onGuest: () => void;
}

export const LoginSelectionScreen: React.FC<LoginSelectionScreenProps> = ({
  onLogin,
  onGuest,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
            {/* Placeholder for Logo - using text for now or the logo asset if available */}
            <Image 
                source={require('../assets/logo/Logo2.png')} 
                style={styles.logo}
                resizeMode="contain"
            />
        </View>

        <View style={styles.textContainer}>
            <Text style={[typography.h1, styles.title]}>Your Worship Travel Companion</Text>
            <Text style={[typography.body, styles.description]}>
                EZUMRAH.com making your worship journey with ease and well-organized. Every sacred step is now within your grasp.
            </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Log in with Email/HP"
            onPress={onLogin}
            style={styles.loginButton}
            textStyle={styles.buttonText}
            icon={<Image source={require('../assets/vector/hp.png')} style={styles.icon} resizeMode="contain" />}
          />
          <Button
            title="Log in as a guest"
            onPress={onGuest}
            style={styles.guestButton}
            textStyle={styles.buttonText}
            icon={<Image source={require('../assets/vector/guest.png')} style={styles.icon} resizeMode="contain" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    padding: spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 178,
    height: 25,
    marginBottom: spacing.s,
  },
  brandName: {
    color: '#20A39E', // Matching the logo color from the image
    fontSize: 24,
  },
  textContainer: {
      alignItems: 'center',
      marginBottom: spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.m,
    fontSize: 16,
  },
  description: {
    textAlign: 'center',
    color: colors.text,
    paddingHorizontal: spacing.s,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.m,
  },
  loginButton: {
    backgroundColor: '#20A39E',
  },
  guestButton: {
    backgroundColor: '#20A39E',
  },
  buttonText: {
      // fontWeight removed to allow font family to control weight
  },
  icon: {
      width: 20,
      height: 20,
      tintColor: colors.surface, // Assuming icons should be white on the teal button
  }
});
