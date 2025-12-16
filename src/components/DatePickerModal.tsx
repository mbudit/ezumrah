import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';
import { spacing } from '../theme/theme';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  onSelect: (date: string) => void;
  initialDate?: string; // Format: YYYY-MM-DD
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DatePickerModal = ({
  visible,
  onClose,
  title,
  onSelect,
  initialDate,
}: DatePickerModalProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // Last 100 years

  // Parse initial date or default to today
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(0); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    if (visible && initialDate) {
      // Try parsing YYYY-MM-DD
      const parts = initialDate.split('-');
      if (parts.length === 3) {
        setSelectedYear(parseInt(parts[0]) || currentYear);
        setSelectedMonth((parseInt(parts[1]) || 1) - 1);
        setSelectedDay(parseInt(parts[2]) || 1);
      }
    }
  }, [visible, initialDate]);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    // Adjust day if month changes and day is invalid (e.g. Feb 30)
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  }, [selectedMonth, selectedYear]);

  const handleConfirm = () => {
    // Format: YYYY-MM-DD
    const m = (selectedMonth + 1).toString().padStart(2, '0');
    const d = selectedDay.toString().padStart(2, '0');
    const dateString = `${selectedYear}-${m}-${d}`;
    onSelect(dateString);
    onClose();
  };

  const renderPickerColumn = (
    data: (string | number)[],
    selected: string | number,
    onSelect: (val: any) => void,
    labelMap?: (val: any) => string,
  ) => (
    <View style={styles.column}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map(item => {
          const val = labelMap ? labelMap(item) : item;
          const isSelected = item === selected;
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.pickerItem,
                isSelected && styles.pickerItemSelected,
              ]}
              onPress={() => onSelect(item)}
            >
              <Text
                style={[
                  styles.pickerText,
                  isSelected && styles.pickerTextSelected,
                ]}
              >
                {val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#333" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            {/* Day */}
            {renderPickerColumn(days, selectedDay, setSelectedDay)}

            {/* Month */}
            {renderPickerColumn(
              Array.from({ length: 12 }, (_, i) => i),
              selectedMonth,
              setSelectedMonth,
              val => MONTHS[val],
            )}

            {/* Year */}
            {renderPickerColumn(years, selectedYear, setSelectedYear)}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    color: 'black',
  },
  pickerContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: spacing.m,
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerItem: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  pickerItemSelected: {
    backgroundColor: '#F0FDFA',
  },
  pickerText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_18pt-Medium',
  },
  pickerTextSelected: {
    color: '#0D9488',
    fontFamily: 'Inter_18pt-Bold',
  },
  footer: {
    padding: spacing.m,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  confirmButton: {
    backgroundColor: '#0D9488',
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 16,
  },
});
