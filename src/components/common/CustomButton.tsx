import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface buttonProps {
  title?: string;
  color?: string;
  onPress?: () => void;
}

export default function CustomButton({
  title,
  color,
  onPress,
}: buttonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color || '#007bff'}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title || 'Click Me'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    height: 48,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
