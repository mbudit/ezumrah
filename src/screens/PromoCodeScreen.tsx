import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/theme';

interface PromoCodeScreenProps {
  onBackPress: () => void;
}

export const PromoCodeScreen = ({ onBackPress }: PromoCodeScreenProps) => {
  const [promoCode, setPromoCode] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Placeholder Box */}
        <View style={styles.placeholderBox} />

        <Text style={styles.title}>Have a promo code?</Text>
        <Text style={styles.subtitle}>
          Enter your promo code below to redeem it.
        </Text>

        <TextInput
          style={styles.input}
          value={promoCode}
          onChangeText={setPromoCode}
          placeholder=""
          autoCapitalize="characters"
        />
      </KeyboardAvoidingView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify Your Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  backButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.m,
    paddingTop: spacing.l,
  },
  placeholderBox: {
    width: 100,
    height: 80,
    backgroundColor: '#E5E7EB', // Gray placeholder
    marginBottom: spacing.l,
    borderRadius: spacing.s,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
    marginBottom: spacing.xl,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    fontSize: 18,
    fontFamily: 'Inter_18pt-Medium',
    color: 'black',
    paddingVertical: spacing.s,
  },
  footer: {
    padding: spacing.m,
    paddingBottom: spacing.xl,
  },
  verifyButton: {
    backgroundColor: '#20A39E',
    paddingVertical: spacing.m,
    borderRadius: spacing.s,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_18pt-SemiBold',
  },
});
