import {StyleSheet, Text, TextInput, View} from 'react-native';

interface inputProps {
  label?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function Input({
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  value,
  onChangeText,
}: inputProps): React.JSX.Element {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    lineHeight: 14,
    color: '#334155',
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0', // Slate-200
    backgroundColor: '#ffffff', // Ajusta según tu color de fondo
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    height: 48,
  },
});
