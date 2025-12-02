import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { colors, spacing, typography } from '../theme/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { fetchServices, ServiceItem, fetchUserProfile } from '../services/api';

export const HomeScreen = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [servicesData, userData] = await Promise.all([
      fetchServices(),
      fetchUserProfile(),
    ]);
    setServices(servicesData);
    setUser(userData as any);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={typography.caption}>Assalamu Alaikum,</Text>
        <Text style={typography.h2}>{user?.name || 'Guest'}</Text>
      </View>
      <View style={styles.avatarContainer}>
          {/* Placeholder for Avatar */}
          <View style={styles.avatarPlaceholder} />
      </View>
    </View>
  );

  const renderHero = () => (
    <Card style={styles.heroCard} variant="elevated">
      <Text style={[typography.h2, { color: colors.surface, marginBottom: spacing.s }]}>
        Plan Your Spiritual Journey
      </Text>
      <Text style={[typography.body, { color: colors.surface, marginBottom: spacing.l }]}>
        Experience a seamless Umrah with our premium packages.
      </Text>
      <Button
        title="Book Now"
        onPress={() => console.log('Book Now Pressed')}
        variant="secondary"
      />
    </Card>
  );

  const renderServiceItem = ({ item }: { item: ServiceItem }) => (
    <Card style={styles.serviceCard} variant="flat">
      <View style={styles.iconPlaceholder} />
      <Text style={[typography.h3, { marginTop: spacing.s }]}>{item.title}</Text>
      <Text style={[typography.caption, { marginTop: spacing.xs }]}>
        {item.description}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderHeader()}
        {renderHero()}
        
        <Text style={[typography.h3, styles.sectionTitle]}>Our Services</Text>
        <View style={styles.servicesGrid}>
            {services.map((item) => (
                <View key={item.id} style={styles.serviceWrapper}>
                    {renderServiceItem({ item })}
                </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.primary,
      opacity: 0.2
  },
  heroCard: {
    backgroundColor: colors.primary,
    padding: spacing.l,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.m,
  },
  servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
  },
  serviceWrapper: {
      width: '48%', // Two columns with some gap
      marginBottom: spacing.m,
  },
  serviceCard: {
    alignItems: 'center',
    padding: spacing.l,
    height: 160, 
    justifyContent: 'center'
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    opacity: 0.1,
    marginBottom: spacing.s,
  },
});
