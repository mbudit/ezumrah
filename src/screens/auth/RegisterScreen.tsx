import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { colors, spacing, typography } from '../../theme/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = () => {
    console.log('Sign Up pressed', { fullName, phoneNumber, icNumber, email });
    // onSignUp();
    // Assuming registration succeeds and logs in
    navigation.replace('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[typography.h3, styles.headerTitle]}>Register</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[typography.h2, styles.title]}>
          Register Once, Make Transactions More Practical
        </Text>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <Input
            label="Phone Number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <Input
            label="IC Number"
            placeholder="IC Number"
            value={icNumber}
            onChangeText={setIcNumber}
          />
          <Input
            label="Email"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            rightIcon={
              isPasswordVisible ? (
                <Eye color={colors.textLight} size={24} />
              ) : (
                <EyeOff color={colors.textLight} size={24} />
              )
            }
            onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />

          <Button
            title="Sign Up"
            onPress={handleSignUp}
            style={styles.signUpButton}
            textStyle={styles.buttonText}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Let’s log in!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
  },
  backButton: {
    padding: spacing.s,
    marginRight: spacing.m,
  },
  headerTitle: {
    flex: 1,
  },
  content: {
    padding: spacing.l,
  },
  title: {
    marginBottom: spacing.xl,
    fontSize: 20, // Adjusted to match design visual
  },
  form: {
    marginBottom: spacing.xl,
  },
  signUpButton: {
    backgroundColor: '#20A39E',
    marginTop: spacing.m,
  },
  buttonText: {
    // Font weight handled by font family
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: spacing.m,
    marginBottom: spacing.xl,
  },
  footerText: {
    color: colors.text,
    fontFamily: 'Inter_18pt-Regular',
  },
  loginText: {
    color: '#20A39E',
    fontFamily: 'Inter_18pt-Bold',
  },
});
