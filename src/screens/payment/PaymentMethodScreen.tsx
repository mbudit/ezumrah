import React, { useState, useEffect } from 'react';
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
import { colors, spacing } from '../../theme/theme';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { usePayment } from '../../hooks/usePayment';
import { PaymentCategory } from '../../types/payment';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethod'>;

export const PaymentMethodScreen = ({ navigation, route }: Props) => {
  const { orderId } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState(
    route.params?.selectedPaymentMethod || '',
  );

  const { getPaymentCategories, isLoading } = usePayment();
  const [categories, setCategories] = useState<PaymentCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getPaymentCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    'QRIS Payment',
  );

  const toggleExpand = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  const handleSelect = (method: string) => {
    navigation.navigate({
      name: 'CompletePayment',
      params: { selectedPaymentMethod: method, orderId: route.params?.orderId },
      merge: true,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {categories.map(category => {
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
