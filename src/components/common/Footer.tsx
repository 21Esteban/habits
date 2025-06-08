import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface FooterProps {
  variant?: 'light' | 'dark';
}

export default function Footer({
  variant = 'light',
}: FooterProps): React.JSX.Element {
  const isDark = variant === 'dark';

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <Text style={[styles.text, isDark && styles.darkText]}>
        © 2025 Habits.AI
      </Text>
      <Text style={[styles.subText, isDark && styles.darkSubText]}>
        Desarrollado con ❤️ para mejorar tus hábitos
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#1e293b',
    borderTopColor: '#334155',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  darkText: {
    color: '#cbd5e1',
  },
  subText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  darkSubText: {
    color: '#94a3b8',
  },
});
