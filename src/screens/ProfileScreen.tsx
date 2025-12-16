import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
  Edit2,
  ShieldCheck,
  Users,
  Heart,
  Activity,
  Ticket,
  Headphones,
  MessageCircle,
  Globe,
  DollarSign,
  Bell,
  Info,
  UserCog,
  ChevronRight,
  User,
  Trash2,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const MenuItem = ({
  icon: Icon,
  label,
  value,
  onPress,
  isDestructive = false,
}: {
  icon: any;
  label: string;
  value?: string;
  onPress?: () => void;
  isDestructive?: boolean;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      <Icon color={isDestructive ? 'red' : '#333'} size={20} />
    </View>
    <Text style={[styles.menuLabel, isDestructive && { color: 'red' }]}>
      {label}
    </Text>
    <View style={styles.menuRight}>
      {value && <Text style={styles.menuValue}>{value}</Text>}
      <ChevronRight color="#ccc" size={20} />
    </View>
  </TouchableOpacity>
);

export const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Background */}
        {/* Header Background */}
        <LinearGradient
          colors={['#20A39E', '#1D938E', '#1A827E', '#13625F']}
          style={styles.headerBackground}
        >
          {/* Added extra height for status bar if needed handled by SafeArea manually or just padding */}
        </LinearGradient>

        {/* Profile Card */}
        <View style={styles.profileCardContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <User size={40} color="#ccc" />
                {/* Placeholder for image if one isn't provided */}
                {/* If we had an image: <Image source={...} style={styles.avatar} /> */}
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Hasan Barsain</Text>
                <Text style={styles.profileEmail}>Hasannagoro@gmail.com</Text>
                <Text style={styles.profilePhone}>+60123456789</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Edit2 size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Insurance */}
          <SectionTitle title="Insurance" />
          <TouchableOpacity style={styles.insuranceCard}>
            <View style={styles.insuranceIconCircle}>
              <ShieldCheck size={24} color="white" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.insuranceText}>
                You can manage and view your insurance policies anytime and
                anywhere.
              </Text>
              <Text style={styles.insuranceLink}>See insurance</Text>
            </View>
          </TouchableOpacity>

          {/* Account Features */}
          <SectionTitle title="Account Features" />
          <View style={styles.menuGroup}>
            <MenuItem icon={Users} label="Save Passengers Data" />
            <View style={styles.divider} />
            <MenuItem icon={Heart} label="Wishlist" />
          </View>

          {/* Activities */}
          <SectionTitle title="Activities" />
          <View style={styles.menuGroup}>
            <MenuItem icon={Activity} label="Activities" />
            <View style={styles.divider} />
            <MenuItem icon={Ticket} label="Promos & Vouchers" />
          </View>

          {/* Customer Care */}
          <SectionTitle title="Customer Care" />
          <View style={styles.menuGroup}>
            <MenuItem icon={Headphones} label="Halo Ezumrah" />
            <View style={styles.divider} />
            <MenuItem icon={MessageCircle} label="Direct Assistance" />
          </View>

          {/* Settings */}
          <SectionTitle title="Settings" />
          <View style={styles.menuGroup}>
            <MenuItem icon={Globe} label="Language" value="English" />
            <View style={styles.divider} />
            <MenuItem icon={DollarSign} label="Currency" value="USD" />
            <View style={styles.divider} />
            <MenuItem icon={Bell} label="Notification" />
          </View>

          {/* Others */}
          <SectionTitle title="Others" />
          <View style={styles.menuGroup}>
            <MenuItem icon={Info} label="About Ezumrah.com" />
            <View style={styles.divider} />
            <MenuItem icon={UserCog} label="Manage Account" />
            {/* <MenuItem icon={Trash2} label="Manage Account" isDestructive /> */}
          </View>
        </View>

        <View style={{ height: 100 }} />
        {/* Bottom padding for tab bar */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerBackground: {
    height: 140,
    // backgroundColor: '#1D938E', // Replaced by gradient
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  profileCardContainer: {
    alignItems: 'center',
    marginTop: 80, // Offset to overlap header
    marginBottom: spacing.l,
    paddingHorizontal: spacing.m,
  },
  profileCard: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    padding: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: '#000',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 12,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  contentContainer: {
    paddingHorizontal: spacing.m,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#333',
    marginBottom: spacing.s,
    marginTop: spacing.s,
  },
  menuGroup: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
    height: 56, // Fixed height for consistency
  },
  menuIconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: spacing.m,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_18pt-Medium',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 52, // Indent past icon
  },
  // Insurance Card Specific
  insuranceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  insuranceIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#20A39E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  insuranceText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
    marginBottom: 4,
  },
  insuranceLink: {
    fontSize: 12,
    color: '#20A39E',
    fontFamily: 'Inter_18pt-Bold',
  },
});
