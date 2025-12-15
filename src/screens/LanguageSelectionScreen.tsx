import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { colors, spacing, typography } from '../theme/theme';
import { Button } from '../components/Button';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;

export const LanguageSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    {
      code: 'ar',
      label: 'Arab',
      flag: require('../assets/flags/arab_flag.png'),
    },
    {
      code: 'id',
      label: 'Indonesia',
      flag: require('../assets/flags/id_flag.png'),
    },
    {
      code: 'en',
      label: 'English',
      flag: require('../assets/flags/eng_flag.png'),
    },
  ];

  const handleNext = () => {
    if (selectedLanguage) {
      // onSelectLanguage(selectedLanguage); // Local state for now, or Context later
      navigation.navigate('LoginSelection');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[typography.h1, styles.title]}>
            Let’s fulfill your sacred calling!
          </Text>
          <Text style={[typography.body, styles.subtitle]}>
            Choose the language that feels comfortable for you
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {languages.map(lang => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  isSelected && styles.languageOptionSelected,
                ]}
                onPress={() => setSelectedLanguage(lang.code)}
                activeOpacity={0.7}
              >
                <View style={styles.labelContainer}>
                  <Image
                    source={lang.flag}
                    style={styles.flag}
                    resizeMode="contain"
                  />
                  <Text style={typography.h3}>{lang.label}</Text>
                </View>
                <View
                  style={[
                    styles.radioOuter,
                    isSelected && styles.radioOuterSelected,
                  ]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={handleNext}
          style={[
            styles.nextButton,
            !selectedLanguage && styles.disabledButton,
          ]}
          textStyle={styles.nextButtonText}
          loading={false}
        />
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
    justifyContent: 'flex-end', // Center vertically like the design seems to imply, or remove if top aligned
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.s,
    textAlign: 'left',
    fontSize: 16,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 14,
    color: colors.textLight,
  },
  optionsContainer: {
    gap: spacing.s,
  },
  languageOption: {
    backgroundColor: colors.surface,
    padding: spacing.m,
    borderRadius: spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageOptionSelected: {
    borderColor: colors.primary, // Or keep border gray if design doesn't highlight border
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 24,
    height: 16, // Aspect ratio for flags usually 3:2
    marginRight: spacing.m,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary, // Default border color for radio
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  footer: {
    padding: spacing.l,
  },
  nextButton: {
    backgroundColor: '#20A39E', // Matching the splash screen color / design button color
    borderRadius: spacing.s,
    paddingVertical: spacing.m,
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontWeight: 'bold',
  },
});
