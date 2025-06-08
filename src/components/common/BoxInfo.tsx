import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';

interface BoxInfoProps {
  title: string;
  subTitle?: string;
  subTitle2?: string;
  variant: 'info' | 'success' | 'warning' | 'error';
}

export default function BoxInfo({
  title,
  subTitle,
  subTitle2,
  variant = 'info',
}: BoxInfoProps): React.JSX.Element {
  const getVariantStyles = () => colors[variant];

  const variantStyles = getVariantStyles();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: variantStyles.border,
          backgroundColor: variantStyles.background,
        },
      ]}>
      <Text style={[styles.title, {color: variantStyles.text}]}>{title}</Text>
      {subTitle && (
        <Text style={[styles.subTitle, {color: variantStyles.text}]}>
          {subTitle}
        </Text>
      )}
      {subTitle2 && (
        <Text style={[styles.subTitle, {color: variantStyles.text}]}>
          {subTitle2}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
