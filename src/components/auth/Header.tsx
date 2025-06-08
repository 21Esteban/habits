import React from 'react';
import {View, Text, StyleSheet, useColorScheme, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({
  title = 'habits.AI',
  subtitle = 'Monitoreo de Glucosa',
}: HeaderProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://media.licdn.com/dms/image/v2/D4E0BAQFcF9Qz_epadg/company-logo_100_100/company-logo_100_100/0/1689969495260/habits_ai_logo?e=1754524800&v=beta&t=72EQwx3XPzpVPnXe7SjjmET7THTqcdOqwcLSOqxIN_M',
          }}
        />
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
});
