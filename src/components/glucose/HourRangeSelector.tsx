import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface HourRangeSelectorProps {
  value: number; // 6, 12, 24
  onChange: (value: number) => void;
}

const OPTIONS = [6, 12, 24];

export default function HourRangeSelector({
  value,
  onChange,
}: HourRangeSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        {OPTIONS.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.option, value === option && styles.selectedOption]}
            onPress={() => onChange(option)}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.optionText,
                value === option && styles.selectedText,
              ]}>
              {option} horas
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  selectedOption: {
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
