import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { X } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/theme';

export const NotificationCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Turn on your notifications</Text>

      <View style={styles.cardShadow}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/icons/notif.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContent}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Turn on App Notification</Text>
              <TouchableOpacity>
                <X color={colors.textLight} size={20} />
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>
              Get exclusive offers and important information about your worship!
            </Text>

            <TouchableOpacity>
              <Text style={styles.actionText}>Turn on now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.l,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: colors.text,
    marginBottom: spacing.s,
  },
  cardShadow: {
    backgroundColor: 'white',
    borderRadius: spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardContent: {
    flexDirection: 'row',
    padding: spacing.m,
    alignItems: 'center',
    borderRadius: spacing.m, // Ensure content clips if needed, though not strictly necessary without overflow hidden
  },
  iconContainer: {
    marginRight: spacing.m,
  },
  icon: {
    width: 62,
    height: 62,
  },
  textContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: colors.text,
    flex: 1,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-SemiBold',
    color: colors.text,
    marginBottom: spacing.s,
    lineHeight: 18,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#20A39E',
  },
});
