import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme/theme';

interface OrderProcessingScreenProps {
  onComplete: () => void;
}

export const OrderProcessingScreen = ({
  onComplete,
}: OrderProcessingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/banner/orderprocess.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Processing your order</Text>
        <Text style={styles.subtitle}>
          We are waiting the vendor to respond. This may take some time.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: spacing.l,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '80%',
  },
});
