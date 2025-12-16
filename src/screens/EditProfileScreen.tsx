import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Edit2,
  User,
} from 'lucide-react-native';
import { colors, spacing } from '../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfileScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('Hasan Barsain');
  const [email, setEmail] = useState('Hasanbarsain@gmail.com');
  const [dob, setDob] = useState('12 May 1999');
  const [gender, setGender] = useState('Male');
  const [phone1, setPhone1] = useState('+60123456789');
  const [phone2, setPhone2] = useState('+60123456788');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <User size={60} color="white" />
              <View style={styles.editIconContainer}>
                <Edit2 size={12} color={colors.primary} />
              </View>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Personal Data</Text>
              <TouchableOpacity>
                <Text style={styles.editLink}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* DOB & Gender Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Text style={styles.inputText}>{dob}</Text>
                  <Calendar size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Gender</Text>
                <TouchableOpacity style={styles.dropdownInput}>
                  <Text style={styles.inputText}>{gender}</Text>
                  <ChevronDown size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Phone Numbers */}
            <View style={styles.inputGroup}>
              <View style={styles.phoneInputContainer}>
                <View style={styles.flagContainer}>
                  {/* Flag Placeholder (emoji or crude rect) */}
                  <Text style={{ fontSize: 20 }}>🇲🇾</Text>
                  <ChevronDown size={16} color="#666" />
                </View>
                <View style={styles.phoneDivider} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.phoneLabelSmall}>Phone number</Text>
                  <Text style={styles.phoneText}>{phone1}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.sectionTitleSmall}>Emergency Contact</Text>
            <View style={styles.inputGroup}>
              <View style={styles.phoneInputContainer}>
                <View style={styles.flagContainer}>
                  <Text style={{ fontSize: 20 }}>🇲🇾</Text>
                  <ChevronDown size={16} color="#666" />
                </View>
                <View style={styles.phoneDivider} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.phoneLabelSmall}>Phone number</Text>
                  <Text style={styles.phoneText}>{phone2}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    marginTop: spacing.s,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
    flex: 1,
    marginLeft: spacing.s, // Add spacing between back arrow and title
  },
  saveButton: {
    backgroundColor: '#ccc', // Disabled look by default
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 12,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.l,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#20A39E', // Teal
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  formSection: {
    paddingHorizontal: spacing.m,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  editLink: {
    fontSize: 12,
    color: '#20A39E',
    fontFamily: 'Inter_18pt-Bold',
  },
  inputGroup: {
    marginBottom: spacing.m,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#000',
  },
  // Phone styling
  phoneInputContainer: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB', // Light gray bg for phone card look
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 12,
  },
  phoneDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#D0D5DD',
    marginRight: 12,
  },
  phoneLabelSmall: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  phoneText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Bold',
    color: '#000',
  },
  sectionTitleSmall: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 10,
  },
});
