import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, typography } from '../theme/theme';

interface VoucherScreenProps {
  onBackPress: () => void;
}

const vouchers = [
  {
    id: '1',
    title: 'Special Umrah Discount',
    description: 'Get 10% off on your next Umrah package booking.',
    expiry: 'Valid until 31 Dec 2025',
    code: 'UMRAH10',
    image: 'https://placehold.co/100x100/png',
  },
  {
    id: '2',
    title: 'Hotel Stay Deal',
    description: 'Save RM 50 on hotel bookings over RM 500.',
    expiry: 'Valid until 30 Nov 2025',
    code: 'HOTEL50',
    image: 'https://placehold.co/100x100/png',
  },
  {
    id: '3',
    title: 'Flight Cashback',
    description: 'Enjoy RM 100 cashback on international flights.',
    expiry: 'Valid until 15 Oct 2025',
    code: 'FLY100',
    image: 'https://placehold.co/100x100/png',
  },
  {
    id: '4',
    title: 'Flight Cashback',
    description: 'Enjoy RM 100 cashback on international flights.',
    expiry: 'Valid until 15 Oct 2025',
    code: 'FLY100',
    image: 'https://placehold.co/100x100/png',
  },
  {
    id: '5',
    title: 'Flight Cashback',
    description: 'Enjoy RM 100 cashback on international flights.',
    expiry: 'Valid until 15 Oct 2025',
    code: 'FLY100',
    image: 'https://placehold.co/100x100/png',
  },
];

export const VoucherScreen = ({ onBackPress }: VoucherScreenProps) => {
  const renderItem = ({ item }: { item: typeof vouchers[0] }) => (
    <View style={styles.voucherItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.expiryText}>{item.expiry}</Text>
        <View style={styles.codeContainer}>
             <Text style={styles.codeLabel}>Code: </Text>
             <Text style={styles.codeText}>{item.code}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.useButton}>
        <Text style={styles.useButtonText}>Use</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <LinearGradient 
      colors={['#20A39E', '#1D938E', '#1A827E', '#13625F']} 
      start={{x: 0, y: 0}} 
      end={{x: 0, y: 1}}
      style={styles.greenBackground}
    >
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Search color={colors.textLight} size={20} style={styles.searchIcon} />
            <TextInput 
              placeholder="Search for promos" 
              placeholderTextColor={colors.textLight}
              style={styles.searchInput}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#20A39E" />
      
      <FlatList
        data={vouchers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  greenBackground: {
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: -60, // Overlap effect
    paddingHorizontal: spacing.m,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  backButton: {
    marginRight: spacing.m,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: spacing.s,
    paddingHorizontal: spacing.s,
    height: 40,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.text,
    paddingVertical: 0,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.xl,
    paddingTop: spacing.m,
  },
  voucherItem: {
    flexDirection: 'row',
    padding: spacing.m,
    backgroundColor: 'white',
    borderRadius: spacing.s,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: spacing.m,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  itemContent: {
    flex: 1,
    marginRight: spacing.s,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Regular',
    color: colors.textLight,
    marginBottom: 4,
  },
  expiryText: {
    fontSize: 10,
    color: '#EF4444', // Red for expiry
    fontFamily: 'Inter_18pt-Regular',
    marginBottom: 4,
  },
  codeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  codeLabel: {
      fontSize: 10,
      color: colors.textLight,
      fontFamily: 'Inter_18pt-Regular',
  },
  codeText: {
      fontSize: 10,
      color: colors.text,
      fontFamily: 'Inter_18pt-Bold',
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
  },
  useButton: {
    backgroundColor: '#20A39E',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: spacing.s,
  },
  useButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter_18pt-Bold',
  },
  separator: {
    height: spacing.m,
  },
});
