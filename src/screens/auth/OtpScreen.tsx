import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, typography } from '../../theme/theme';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export const OtpScreen: React.FC<Props> = ({ navigation, route }) => {
  const phoneNumber = route.params?.phoneNumber || '+60123456789';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(167); // 02:47 in seconds
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      // Auto verify or wait for button? Design doesn't show button, usually auto or keyboard enter.
      // Let's just log for now or call verify if complete
      if (newOtp.join('').length === 6) {
        if (newOtp.join('').length === 6) {
          // onVerify(newOtp.join(''));
          navigation.replace('Home');
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
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
        <Text style={[typography.h3, styles.headerTitle]}>OTP</Text>
      </View>

      <View style={styles.content}>
        <Text style={[typography.h2, styles.title]}>Enter the OTP code</Text>
        <Text style={[typography.body, styles.description]}>
          The code has been sent to WhatsApp{' '}
          <Text style={styles.boldText}>{phoneNumber}</Text>. Please check your
          messages if received.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={value => handleOtpChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <Text style={styles.timerText}>
          Request a new OTP code at {formatTime(timer)}.
        </Text>
      </View>
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
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
  },
  content: {
    padding: spacing.l,
  },
  title: {
    marginBottom: spacing.s,
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
  },
  description: {
    color: colors.textLight,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  boldText: {
    fontFamily: 'Inter_18pt-Bold',
    color: colors.text,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.s,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: colors.text,
    backgroundColor: colors.surface,
  },
  timerText: {
    color: colors.textLight,
    fontFamily: 'Inter_18pt-Regular',
  },
});
