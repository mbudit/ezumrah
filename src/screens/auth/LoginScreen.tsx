import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, typography } from '../../theme/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    // Implement actual login logic here
    console.log('Logging in with:', phoneNumber);
    // Implement actual login logic here
    console.log('Logging in with:', phoneNumber);
    // onLoginSuccess();
    navigation.navigate('Otp', { phoneNumber });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo/Logo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.form}>
          <Input
            label="Phone Number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <Button
            title="Log in"
            onPress={handleLogin}
            style={styles.loginButton}
            textStyle={styles.buttonText}
            icon={
              <Image
                source={require('../../assets/vector/hp.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            }
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Register now!</Text>
          </TouchableOpacity>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    width: 178,
    height: 25,
  },
  form: {
    marginBottom: 0,
  },
  loginButton: {
    backgroundColor: '#20A39E',
    marginTop: spacing.m,
  },
  buttonText: {
    // Font weight handled by font family
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.surface,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.l,
  },
  footerText: {
    color: colors.text,
    fontFamily: 'Inter_18pt-Regular',
  },
  registerText: {
    color: '#20A39E',
    fontFamily: 'Inter_18pt-Bold',
  },
});
