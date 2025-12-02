import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

interface InputProps extends TextInputProps {
  label?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({ label, style, rightIcon, onRightIconPress, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={[typography.body, styles.label]}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textLight}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
  },
  label: {
    marginBottom: spacing.s,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 14,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.s,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    padding: spacing.m,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Inter_18pt-Regular',
  },
  rightIcon: {
    padding: spacing.m,
  },
});
