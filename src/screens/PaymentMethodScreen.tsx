import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface PaymentMethodScreenProps {
  onBackPress: () => void;
  onSelectMethod: (method: string) => void;
  selectedMethod: string;
}

interface PaymentMethodItem {
  id: string;
  label: string;
  image?: any;
}

interface PaymentCategory {
  title: string;
  data: PaymentMethodItem[];
}

export const PaymentMethodScreen = ({
  onBackPress,
  onSelectMethod,
  selectedMethod,
}: PaymentMethodScreenProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    'QRIS Payment',
  );

  const PAYMENT_CATEGORIES: PaymentCategory[] = [
    {
      title: 'QRIS Payment',
      data: [
        {
          id: 'QRIS',
          label: 'QRIS',
          image: require('../assets/icons/qris.png'),
        },
      ],
    },
    {
      title: 'Virtual Account',
      data: [
        {
          id: 'BCA',
          label: 'BCA Virtual Account',
          image: require('../assets/icons/bca.png'),
        },
        {
          id: 'Mandiri',
          label: 'Mandiri Virtual Account',
          image: require('../assets/icons/mandiri.png'),
        },
        {
          id: 'BNI',
          label: 'BNI Virtual Account',
          image: require('../assets/icons/bni.png'),
        },
        {
          id: 'BSI',
          label: 'BSI Virtual Account',
          image: require('../assets/icons/bsi.png'),
        },
        {
          id: 'CIMB',
          label: 'CIMB Niaga Virtual Account',
          image: require('../assets/icons/cimbniaga.png'),
        },
        {
          id: 'RHB',
          label: 'RHB Bank Virtual Account',
          image: require('../assets/icons/rhbank.png'),
        },
        {
          id: 'Toyyibpay',
          label: 'Toyyibpay Virtual Account',
          image: require('../assets/icons/toyyibpay.png'),
        },
      ],
    },
    {
      title: 'E-wallet',
      data: [
        {
          id: 'GoPay',
          label: 'GoPay',
          image: require('../assets/icons/gopay.png'),
        },
        {
          id: 'OVO',
          label: 'OVO',
          image: require('../assets/icons/ovo.png'),
        },
        {
          id: 'ShopeePay',
          label: 'ShopeePay',
          image: require('../assets/icons/shopeepay.png'),
        },
        {
          id: 'Dana',
          label: 'Dana',
          image: require('../assets/icons/dana.png'),
        },
      ],
    },
    {
      title: 'Credit/Debit Card',
      data: [
        {
          id: 'CC',
          label: 'Visa/Mastercard',
          image: require('../assets/icons/visamastercard.png'),
        },
      ],
    },
  ];

  const toggleExpand = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  const handleSelect = (method: string) => {
    onSelectMethod(method);
    onBackPress();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {PAYMENT_CATEGORIES.map(category => {
          const isExpanded = expandedCategory === category.title;
          return (
            <View key={category.title} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => toggleExpand(category.title)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryTitle}>{category.title}</Text>
                {isExpanded ? (
                  <ChevronUp color="black" size={20} />
                ) : (
                  <ChevronDown color="black" size={20} />
                )}
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.optionsList}>
                  {category.data.map(item => {
                    const isSelected = selectedMethod === item.id;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.optionItem}
                        onPress={() => handleSelect(item.id)}
                      >
                        <View style={styles.optionLeft}>
                          {item.image && (
                            <Image
                              source={item.image}
                              style={styles.methodLogo}
                            />
                          )}
                          <Text
                            style={[
                              styles.optionLabel,
                              isSelected && styles.optionLabelSelected,
                            ]}
                          >
                            {item.label}
                          </Text>
                        </View>
                        {isSelected && (
                          <CheckCircle2 size={18} color="#0D9488" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              <View style={styles.separator} />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  content: {
    padding: spacing.m,
  },
  categoryContainer: {
    marginBottom: 0,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.m,
    backgroundColor: 'white',
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  optionsList: {
    paddingHorizontal: spacing.s,
    paddingBottom: spacing.s,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0,
    // Add subtle divider if needed, or just relying on spacing
  },
  optionLabel: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter_18pt-Medium',
  },
  optionLabelSelected: {
    color: '#0D9488',
    fontFamily: 'Inter_18pt-Bold',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodLogo: {
    width: 40,
    height: 24,
    resizeMode: 'contain',
  },
});
